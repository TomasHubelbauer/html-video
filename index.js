import stamp from './stamp.js';

const div = document.querySelector('div');
const canvas = document.querySelector('canvas');
const video = document.querySelector('video');
const a = document.querySelector('a');

// See `index.css` for the initial values (1080p)
const width = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--width'));
const height = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--height'));
canvas.width = width;
canvas.height = height;

const context = canvas.getContext('2d');
const title = document.title;

const scripts = [await import('./scripts/stamps.js'), await import('./scripts/ball.js')];
for (const { default: script } of scripts) {
  const button = document.createElement('button');
  button.textContent = script.name;
  button.addEventListener('click', async () => {
    // Disable all buttons while the video is rendering
    document.querySelectorAll('button').forEach(button => button.disabled = true);

    // Set the `canvas` to be visible to show the rendering progress
    canvas.classList.remove('done');

    // Release the video rendering URL if there was one and reset the `video`
    URL.revokeObjectURL(video.src);

    // Clear the `video[src]` to make the `video` disappear using CSS
    video.removeAttribute('src');

    /** @type {Blob[]} */
    const blobs = [];

    const mediaStream = canvas.captureStream();
    const mediaRecorder = new MediaRecorder(mediaStream);
    mediaRecorder.addEventListener('dataavailable', event => blobs.push(event.data));
    mediaRecorder.addEventListener('stop', () => {
      mediaStream.getTracks().forEach(track => track.stop());

      const types = blobs.map(blob => blob.type).filter((type, index, types) => types.indexOf(type) === index);
      if (types.length !== 1) {
        throw new Error(`All blobs do not share the same type: ${types.join(', ')}.`);
      }

      const [type] = types;
      const blob = new Blob(blobs, { type });
      const url = URL.createObjectURL(blob);
      video.src = url;

      let size = blob.size;
      let unit = 0;
      while (size > 1024) {
        size /= 1024;
        unit++;
      }

      a.href = url;
      a.textContent = `Download (${size.toFixed(2)} ${['b', 'kB', 'MB'][unit]})`;
      a.addEventListener('click', event => {
        const name = prompt('.webm', stamp());
        if (!name) {
          event.preventDefault();
          return;
        }

        a.download = name + '.webm'
      });
    });

    mediaRecorder.start();

    for await (const frame of script(context)) {
      document.title = `${title} ${frame}`;
      await new Promise(resolve => requestAnimationFrame(resolve));
    }

    canvas.classList.add('done');
    mediaRecorder.stop();

    // Re-enable all buttons after the video is done rendering
    document.querySelectorAll('button').forEach(button => button.disabled = false);
  });

  div.append(button);
}
