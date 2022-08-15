export default function newStudentTR(student) {
  const $studentTR = document.createElement('tr');
  const $fioTD = document.createElement('td');
  const $facultyTD = document.createElement('td');
  const $birthDateTD = document.createElement('td');
  const $yearStudyTD = document.createElement('td');

  $studentTR.classList.add('table-student__row');
  $fioTD.classList.add('table-student__item');
  $facultyTD.classList.add('table-student__item');
  $birthDateTD.classList.add('table-student__item');
  $yearStudyTD.classList.add('table-student__item');

  const callStudentAge = student.getAge();

  $fioTD.textContent = student.fio;
  $birthDateTD.textContent = `${student.getBirthDateString()} (${student.getAge()} ${getAgeDeclination(
    callStudentAge
  )})`;
  $yearStudyTD.textContent = `${student.yearStudy} - ${student.yearStudy + 4} ${student.getEducationPeriod()}`;
  $facultyTD.textContent = student.faculty;

  $studentTR.append($fioTD);
  $studentTR.append($facultyTD);
  $studentTR.append($birthDateTD);
  $studentTR.append($yearStudyTD);

  return $studentTR;
}

function getAgeDeclination(age) {
  if (age % 10 === 1) {
    return 'год';
  }

  if ([2, 3, 4].includes(age % 10)) {
    return 'года';
  }

  if ([11, 12, 13, 14].includes(age)) {
    return 'лет';
  }

  return 'лет';
}
