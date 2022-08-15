import '@/style/style.scss';

import Student from './student';
import { render, students } from './render';
import { inputs, inputValidation } from './validationForm';
import filteredTable from './filterTable';

const errors = [];
const $inputFormList = document.querySelectorAll('.form-add-student__input');

function pushStudentValidation() {
  try {
    inputValidation($inputFormList, errors);
  } catch (err) {
    if (err.name !== 'TypeError') {
      throw err;
    }

    if (err.errorMessages) {
      for (const errorMessage of err.errorMessages) {
        inputs[errorMessage.name].parentNode.querySelector('.invalid-feedback').textContent = errorMessage.message;
        inputs[errorMessage.name].classList.add('is-invalid');
      }
    }
  }
}

function pushStudentBase() {
  if (errors.length) {
    return;
  }

  students.push(
    new Student(
      inputs.name.value,
      inputs.surname.value,
      inputs.lastname.value,
      inputs.faculty.value,
      new Date(inputs.birthDate.value),
      Number(inputs.yearStudy.value)
    )
  );

  for (const input in inputs) {
    if (Object.hasOwnProperty.call(inputs, input)) {
      inputs[input].classList.remove('is-invalid');
      inputs[input].classList.remove('is-valid');
      inputs[input].value = '';
    }
  }

  render();
}
// Добавление
document.getElementById('form-add-student').addEventListener('submit', function (event) {
  event.preventDefault();

  errors.length = 0;

  pushStudentValidation();
  pushStudentBase();
});

render();

document.addEventListener('DOMContentLoaded', function () {
  filteredTable();
});
