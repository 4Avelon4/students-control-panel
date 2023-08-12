import declensionNumbers from './declensionNumbers';

export default function declensionYears(number) {
  const words = ['год', 'года', 'лет'];

  return declensionNumbers(number, words);
}
