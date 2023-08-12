export default function compareArray(arrayFirst, arraySecond) {
  for (let i = 0; i < arrayFirst.length; i++) {
    for (let j = 0; j < arraySecond.length; j++) {
      if (arrayFirst[i] === arraySecond[j]) {
        return true;
      }
    }
  }

  return false;
}
