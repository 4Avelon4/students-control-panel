export default function dateFormatter(dateValue) {
  const date = new Date(dateValue);

  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();

  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }

  return {
    yyyy,
    mm,
    dd,
  };
}
