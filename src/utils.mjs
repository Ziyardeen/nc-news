export default function randomNumberArray(num) {
  // const min = 0;
  // const max = num;

  const result = new Set();

  while (result.size < 5) {
    result.add(Math.floor(Math.random() * num));
  }

  return Array.from(result);
}
