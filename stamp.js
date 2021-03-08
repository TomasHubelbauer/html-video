export default function stamp() {
  return new Date().toISOString().slice(0, 19).replace(/[T:]/g, '-');
}
