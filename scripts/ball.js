export default function ball(/** @type {CanvasRenderingContext2D} */ context, /** @type {number} */ width, /** @type {number} */ height, /** @type {number} */ time) {
  const duration = 20_000;
  const size = 100;
  const bounce = 1 - (time / (duration * 1.1));
  const reach = (height - size * 3) * bounce;
  const squash = .9 + ((Math.sin(time / 200) + 1) / 2) * .1;
  const shadow = .75 - ((Math.sin(time / 200) + 1) / 2) * .25;
  const tile = 40;
  const shift = (time / 200) % width;

  // Parallax
  for (let x = 0; x < width + tile / tile; x++) {
    for (let y = 0; y < height / tile; y++) {
      context.fillStyle = Math.abs(~~x) % 2 ^ y % 2 === 0 ? 'white' : 'whitesmoke';
      context.fillRect((x - shift) * tile, y * tile, tile, tile);
    }
  }

  // Ground
  context.fillStyle = 'silver';
  context.fillRect(0, height - size * 2, width, height);

  // Shadow
  context.beginPath();
  context.ellipse(width / 2, height - size * 1.25, size * shadow, size / 4 * shadow, 0, 0, 2 * Math.PI);
  context.fillStyle = 'darkgray';
  context.fill();

  // Ball
  context.beginPath();
  const x = width / 2;
  const y = height - size * 2 - (Math.sin(time / 200) + 1) * ((reach - size) / 2);
  context.ellipse(x, y, size, size * squash, 0, 0, 2 * Math.PI);
  const gloss = context.createRadialGradient(x + size / 3, y - size / 3, 30, x, y, size);
  gloss.addColorStop(0, 'white');
  gloss.addColorStop(.2, 'whitesmoke');
  gloss.addColorStop(.5, 'silver');
  gloss.addColorStop(1, 'gray');
  context.fillStyle = gloss;
  context.fill();

  return time < duration;
}
