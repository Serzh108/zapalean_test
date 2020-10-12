export default function randomColor() {
  const color = () => Math.floor(Math.random() * 255 + 1);
  return `rgb(${color()}, ${color()}, ${color()})`;
}
