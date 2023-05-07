export default function stamp() {
  return new Date().toISOString().slice(0, 'yyyy-mm-dd-hh-mm-ss'.length).replace(/[T:]/g, '-');
}
