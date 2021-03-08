import stamp from './stamp.js';
import stamps from './stamps.js';

window.addEventListener('load', () => {
  const scripts = [stamps];

  const div = document.getElementById('div');
  for (const script of scripts) {
    const button = document.createElement('button');
    button.textContent = script.name;
    button.addEventListener('click', handleButtonClick);
    div.append(button);
  }

  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById('canvas');

  // See `index.css` for the initial values (1080p)
  canvas.width = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--width'));
  canvas.height = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--height'));

  /** @type {HTMLVideoElement} */
  const video = document.getElementById('video');

  /** @type {MediaStream} */
  let mediaStream;

  /** @type {Blob[]} */
  let blobs;

  /** @type {HTMLAnchorElement} */
  let a;

  function handleButtonClick(/** @type {Event} */ event) {
    /** @type {HTMLButtonElement} */
    const button = event.currentTarget;
    const name = button.textContent;
    const script = scripts.find(script => script.name === name);

    /** @type {HTMLButtonElement[]} */
    const buttons = Array.from(div.children);
    buttons.forEach((/** @type {HTMLButtonElement} */ button) => button.disabled = true);

    canvas.removeAttribute('class');
    URL.revokeObjectURL(video.src);
    video.removeAttribute('src');
    a?.remove();

    const context = canvas.getContext('2d');
    mediaStream = canvas.captureStream();
    blobs = [];

    const mediaRecorder = new MediaRecorder(mediaStream);
    mediaRecorder.addEventListener('dataavailable', handleMediaRecorderDataAvailable);
    mediaRecorder.addEventListener('stop', handleMediaRecorderStop);
    mediaRecorder.start();

    const now = window.performance.now();
    window.requestAnimationFrame(function render(time) {
      if (script(context, time - now)) {
        window.requestAnimationFrame(render);
      }
      else {
        canvas.className = 'done';
        mediaRecorder.stop();
        buttons.forEach((/** @type {HTMLButtonElement} */ button) => button.disabled = false);
      }
    });
  }

  function handleMediaRecorderDataAvailable(/** @type {Event} */ event) {
    blobs.push(event.data)
  }

  function handleMediaRecorderStop() {
    mediaStream.getTracks().forEach(track => track.stop());
    mediaStream = undefined;

    const types = blobs.map(blob => blob.type).filter((type, index, types) => types.indexOf(type) === index);
    if (types.length !== 1) {
      throw new Error(`All blobs do not share the same type: ${types.join(', ')}.`);
    }

    const [type] = types;
    const blob = new Blob(blobs, { type });
    blobs = undefined;

    const url = URL.createObjectURL(blob);
    video.src = url;

    let size = blob.size;
    let unit = 0;
    while (size > 1024) {
      size /= 1024;
      unit++;
    }

    a = document.createElement('a');
    a.href = url;
    a.textContent = `Download (${size.toFixed(2)} ${['b', 'kB', 'MB'][unit]})`;
    a.addEventListener('click', () => a.download = prompt('.webm', stamp()) + '.webm');
    document.body.append(a);
  }
});
