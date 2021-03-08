import stamp from '../stamp.js';

const image = new Image();
image.src = 'favicon.ico';

export default function stamps(/** @type {CanvasRenderingContext2D} */ context, /** @type {number} */ width, /** @type {number} */ height, /** @type {number} */ time) {
  function marquee(size, position) {
    context.font = `normal ${size}pt sans-serif`;
    context.fillStyle = `rgba(0, 0, 0, ${size / height * 2})`;
    context.fillText(stamp(), width + -((time / (size / 100)) % (width * (size / 100) * 3)), position + size);
  }

  context.drawImage(image, 0, 0, 32, 32);

  marquee(200, 0);
  marquee(300, 100);
  marquee(50, 500);
  marquee(100, 700);
  marquee(250, 800);

  return time < 5_000;
}
