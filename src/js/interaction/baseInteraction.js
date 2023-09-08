import { activeStudentID } from '../config/activeStudentID';
import { inputs } from '../validation/formValidation';
import { clearForm } from '../form/clearForm';
import { listStudents, renderTable } from '../table/renderTable';
import { serverAddStudent, serverSetStudent } from './serverInteraction';
import Student from '../student/student';

const $inputSurname = document.getElementById('input-surname');
const $inputName = document.getElementById('input-name');
const $inputLastname = document.getElementById('input-lastname');
const $inputBirthday = document.getElementById('input-birthday');
const $inputStudyStart = document.getElementById('input-studyStart');
const $inputFaculty = document.getElementById('input-faculty');

const $form = document.querySelector('.section-form');
const $popap = document.querySelector('.popap');

const errors = [];

function createStudentObj() {
  if (errors.length) {
    return {};
  }

  const newStudentObj = {
    name: inputs.name.value,
    surname: inputs.surname.value,
    lastname: inputs.lastname.value,
    birthday: new Date(inputs.birthday.value),
    studyStart: Number(inputs.studyStart.value),
    faculty: inputs.faculty.value,
  };

  return newStudentObj;
}

function compareStudentObj(id) {
  const studentObj = listStudents.find((student) => student.id === id);

  if (
    $inputName.value === studentObj.name &&
    $inputName.value === studentObj.name &&
    $inputSurname.value === studentObj.surname &&
    $inputLastname.value === studentObj.lastname &&
    $inputBirthday.value === studentObj.getBirthdayStringInInput() &&
    $inputStudyStart.value === studentObj.studyStart &&
    $inputFaculty.value === studentObj.faculty
  ) {
    return true;
  }

  return false;
}

async function pushStudentBase() {
  const newStudentObj = createStudentObj();

  if (!Object.keys(newStudentObj).length) {
    return;
  }

  const serverDataObj = await serverAddStudent({ ...newStudentObj });

  serverDataObj.birthday = new Date(serverDataObj.birthday);

  listStudents.push(
    new Student(
      serverDataObj.id,
      serverDataObj.name,
      serverDataObj.surname,
      serverDataObj.lastname,
      serverDataObj.faculty,
      serverDataObj.birthday,
      serverDataObj.studyStart
    )
  );

  renderTable();
  clearForm();

  $form.classList.remove('active');
  $popap.classList.remove('active');
}

async function changeStudentBase() {
  const newStudentObj = createStudentObj();

  if (!Object.keys(newStudentObj).length) {
    return;
  }

  const compare = compareStudentObj(activeStudentID.id);

  if (compare) {
    clearForm();

    $form.classList.remove('active');
    $popap.classList.remove('active');

    return;
  }

  const serverDataObj = await serverSetStudent(activeStudentID.id, { ...newStudentObj });

  serverDataObj.birthday = new Date(serverDataObj.birthday);

  renderTable();
  clearForm();

  $form.classList.remove('active');
  $popap.classList.remove('active');
}

export { pushStudentBase, changeStudentBase };
