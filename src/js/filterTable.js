export default function filteredTable() {
  const $formFilter = document.getElementById('form-filter-student');
  const $table = document.getElementsByTagName('table')[0];

  const $inputFIO = document.getElementById('input-searth-fio');
  const $inputFaculty = document.getElementById('input-searth-faculty');
  const $inputYearStarting = document.getElementById('input-searth-year-starting');
  const $inputYearGraduation = document.getElementById('input-searth-year-graduation');

  $formFilter.addEventListener('keyup', textInputTimer);

  let timeout = null;

  function textInputTimer() {
    clearTimeout(timeout);

    timeout = setTimeout(getFilteredData, 300);
  }

  function getFilteredData() {
    for (let i = 1; i < $table.rows.length; i++) {
      const element = $table.rows[i];
      element.classList.remove('hide');

      if (
        element.cells[0].innerHTML.indexOf($inputFIO.value) === -1 ||
        element.cells[1].innerHTML.indexOf($inputFaculty.value) === -1 ||
        element.cells[3].innerHTML.indexOf($inputYearStarting.value) === -1 ||
        element.cells[3].innerHTML.indexOf($inputYearGraduation.value) === -1
      ) {
        element.classList.add('hide');
      }
    }
  }
}
