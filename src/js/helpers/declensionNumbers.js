export default function declensionNumbers(number, words) {
  const bigNumber = Math.abs(number) % 100;

  const smallNumber = number % 10;

  if (bigNumber > 10 && bigNumber < 20) {
    return words[2];
  }

  if (smallNumber > 1 && smallNumber < 5) {
    return words[1];
  }

  if (smallNumber === 1) {
    return words[0];
  }

  return words[2];
}
