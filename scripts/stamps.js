import stamp from '../stamp.js';

const image = new Image();
image.src = 'icon.png';

export default function stamps(/** @type {CanvasRenderingContext2D} */ context, /** @type {number} */ time) {
  context.drawImage(image, 0, 0, 32, 32);

  const width = context.canvas.width;
  const height = context.canvas.height;
  for (const [size, position] of [[200, 0], [300, 100], [50, 500], [100, 700], [250, 800]]) {
    context.font = `normal ${size}pt sans-serif`;
    context.fillStyle = `rgba(0, 0, 0, ${size / height * 2})`;
    context.fillText(stamp(), width + -((time / (size / 100)) % (width * (size / 100) * 3)), position + size);
  }

  return time < 5_000;
}
