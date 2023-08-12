export default function getToday() {
  const today = new Date();
  const year = today.getFullYear() + 1;
  const month = today.getMonth() < 10 ? `0${today.getMonth()}` : `${today.getMonth()}`;
  const day = today.getDate() < 10 ? `0${today.getDate()}` : `${today.getDate()}`;

  return { day, month, year };
}
