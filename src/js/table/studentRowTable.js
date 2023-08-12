import declensionYears from '../helpers/declensionYears';
import { view } from './selectionRowTable';
import { activeStudentID } from '../config/activeStudentID';

const $changeStudentButton = document.getElementById('change-student-btn');
const $daleteStudentButton = document.getElementById('delete-student-btn');

export default function studentRowTable(student) {
  const $studentTR = document.createElement('tr');
  const $fioTD = document.createElement('td');
  const $facultyTD = document.createElement('td');
  const $birthdayTD = document.createElement('td');
  const $studyStartTD = document.createElement('td');

  $studentTR.classList.add('table-student__row');
  $fioTD.classList.add('table-student__item', 'table-student__item--fio');
  $facultyTD.classList.add('table-student__item', 'table-student__item--faculty');
  $birthdayTD.classList.add('table-student__item', 'table-student__item--birthday');
  $studyStartTD.classList.add('table-student__item');

  const callStudentAge = student.getAge();

  $fioTD.textContent = student.fio;
  $birthdayTD.textContent = `${student.getBirthdayString()} (${student.getAge()} ${declensionYears(callStudentAge)})`;
  $studyStartTD.textContent = `${student.studyStart} - ${+student.studyStart + 4} ${student.getEducationPeriod()}`;
  $facultyTD.textContent = student.faculty;

  const studentTR = {
    el: $studentTR,

    addEventListener() {
      this.el.addEventListener('click', (event) => {
        const target = event.currentTarget;

        if (target.classList.contains('row--active')) {
          target.classList.remove('row--active');

          $changeStudentButton.disabled = true;
          $daleteStudentButton.disabled = true;

          return;
        }

        view.selected = target;
        activeStudentID.id = student.id;

        $changeStudentButton.disabled = false;
        $daleteStudentButton.disabled = false;
      });
    },
  };

  studentTR.addEventListener();

  $studentTR.append($fioTD);
  $studentTR.append($facultyTD);
  $studentTR.append($birthdayTD);
  $studentTR.append($studyStartTD);

  return $studentTR;
}
