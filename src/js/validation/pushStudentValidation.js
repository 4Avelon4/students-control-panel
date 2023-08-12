import { inputValidation, inputs } from './formValidation';

const $inputFormList = document.querySelectorAll('.form-add-student__input');

export default function pushStudentValidation() {
  const errors = [];

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

    return false;
  }

  return true;
}
