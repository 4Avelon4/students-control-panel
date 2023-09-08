const $formFilter = document.getElementById('search-form');
const $allInput = document.querySelectorAll('.search-form__input');
const $table = document.getElementById('table-student__body');

const $inputFIO = document.getElementById('input-searth-fio');
const $inputFaculty = document.getElementById('input-searth-faculty');
const $inputStudyStart = document.getElementById('input-searth-study-start');
const $inputYearGraduation = document.getElementById('input-searth-year-graduation');

const classInputClean = 'input-clean--active';
const $allCleanElement = document.querySelectorAll('.input-clean');

function getFilteredData() {
  for (let i = 0; i < $table.rows.length; i++) {
    const element = $table.rows[i];

    element.classList.remove('hide');

    if (
      element.cells[0].innerHTML.indexOf($inputFIO.value) === -1 ||
      element.cells[1].innerHTML.indexOf($inputFaculty.value) === -1 ||
      element.cells[3].innerHTML.substr(0, 4).indexOf($inputStudyStart.value) === -1 ||
      element.cells[3].innerHTML.substr(7, 4).indexOf($inputYearGraduation.value) === -1
    ) {
      element.classList.add('hide');
    }
  }
}

$allCleanElement.forEach((input) =>
  input.addEventListener('click', (event) => {
    const targetInputClean = event.currentTarget;
    const targetInput = event.currentTarget.previousElementSibling;

    targetInput.value = '';
    targetInputClean.classList.remove(classInputClean);

    getFilteredData();
  })
);

export function inputClean(input, flag) {
  if (input.nextElementSibling) {
    input.nextElementSibling.classList.toggle(classInputClean, flag);
  }
}

export function filteredTable() {
  let timeout = null;

  function textInputTimer() {
    clearTimeout(timeout);

    $allInput.forEach((input) => {
      if (input.value) {
        inputClean(input, true);
      } else {
        inputClean(input, false);
      }
    });

    timeout = setTimeout(getFilteredData, 300);
  }

  $formFilter.addEventListener('keyup', textInputTimer);
}
