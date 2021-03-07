window.addEventListener('load', () => {
  // See `index.css` for the initial values (1080p)
  const width = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--width'));
  const height = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--height'));

  // Duration in seconds
  const duration = 20;

  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');

  /** @type {HTMLVideoElement} */
  const video = document.getElementById('video');

  /** @type {HTMLAnchorElement} */
  const a = document.getElementById('a');

  a.addEventListener('click', () => {
    a.download = prompt('.webm', stamp()) + '.webm';
    document.title = a.download;
  });

  const stream = canvas.captureStream();
  const mediaRecorder = new MediaRecorder(stream);

  /** @type {Blob[]} */
  const blobs = [];

  mediaRecorder.addEventListener('dataavailable', event => blobs.push(event.data));
  mediaRecorder.addEventListener('stop', () => {
    stream.getTracks().forEach(track => track.stop());
    canvas.remove();

    const [type] = blobs.map(blob => blob.type).filter((type, index, types) => types.indexOf(type) === index);
    const blob = new Blob(blobs, { type });
    const url = URL.createObjectURL(blob);
    delete blobs;
    delete blob;

    video.src = url;

    let size = blob.size;
    let unit = 0;
    while (size > 1024) {
      size /= 1024;
      unit++;
    }

    a.href = url;
    a.textContent = `Download (${size.toFixed(2)} ${['b', 'kB', 'MB'][unit]})`;
  });

  mediaRecorder.start();
  window.setTimeout(() => mediaRecorder.stop(), duration * 1000);

  const image = new Image();
  image.src = 'favicon.ico';

  window.requestAnimationFrame(function render(_stamp) {
    function marquee(size, position) {
      context.font = `normal ${size}pt sans-serif`;
      context.fillStyle = `rgba(0, 0, 0, ${size / height * 2})`;
      context.fillText(stamp(), width + -((_stamp / (size / 100)) % (width * (size / 100) * 3)), position + size);
    }

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.drawImage(image, 0, 0, 32, 32);

    marquee(200, 0);
    marquee(300, 100);
    marquee(50, 500);
    marquee(100, 700);
    marquee(250, 800);

    if (mediaRecorder.state === 'recording') {
      window.requestAnimationFrame(render);
    }
  });
});

function stamp() {
  return new Date().toISOString().slice(0, 19).replace(/[T:]/g, '-');
}
