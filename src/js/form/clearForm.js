import { listStudents } from '../table/renderTable';

const $inputFormList = document.querySelectorAll('.form-add-student__input');

const $inputSurname = document.getElementById('input-surname');
const $inputName = document.getElementById('input-name');
const $inputLastname = document.getElementById('input-lastname');
const $inputBirthday = document.getElementById('input-birthday');
const $inputStudyStart = document.getElementById('input-studyStart');
const $inputFaculty = document.getElementById('input-faculty');

export function getStudent(id) {
  const studentObj = listStudents.find((student) => student.id === id);

  $inputName.value = studentObj.name;
  $inputSurname.value = studentObj.surname;
  $inputLastname.value = studentObj.lastname;
  $inputBirthday.value = studentObj.getBirthdayStringInInput();
  $inputStudyStart.value = studentObj.studyStart;
  $inputFaculty.value = studentObj.faculty;
}

export function clearForm() {
  for (const input in $inputFormList) {
    if (Object.hasOwnProperty.call($inputFormList, input)) {
      $inputFormList[input].classList.remove('is-invalid');
      $inputFormList[input].classList.remove('is-valid');
      $inputFormList[input].value = '';
    }
  }
}
