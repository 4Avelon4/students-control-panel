import Student from './student';
import newStudentTR from './studentTR';

// Массив студентов
const students = [
  new Student('Игорь', 'Фролов', 'Сергеевич', 'Механико-математический', new Date(1992, 2, 21), 2018),
  new Student('Алена', 'Белых', 'Юрьевна', 'Филологический', new Date(1998, 4, 11), 2010),
  new Student('Иван', 'Иванов', 'Иванович', 'Строительно-технологический', new Date(1987, 1, 23), 2021),
  new Student('Алина', 'Канаева', 'Александровна', 'Биологический', new Date(1997, 10, 28), 2015),
  new Student('Максим', 'Егоров', 'Сергеевич', 'Информационных технологий', new Date(1994, 11, 7), 2015),
  new Student('Игорь', 'Резлер', 'Владимирович', 'Механико-математический', new Date(1994, 4, 28), 2012),
  new Student('Евгений', 'Емельянов', 'Викторович', 'Юридический', new Date(1980, 12, 6), 2000),
  new Student('Михаил', 'Шкода', 'Васильевич', 'Строительно-технологический', new Date(1998, 9, 17), 2021),
  new Student('Екатерина', 'Буланова', 'Владимировна', 'Биологический', new Date(1995, 11, 16), 2016),
  new Student('Сергей', 'Манухин', 'Сергеевич', 'Информационных технологий', new Date(1995, 10, 20), 2015),
];

const $studentsList = document.getElementById('list-student');
const $studentsListTHAll = document.querySelectorAll('.table-student__column');

let [column, columnDir] = ['fio', true];

// Получить сортировку массива по параметрам
function getSortStudents(prop, dir) {
  const studentsCopy = [...students];

  return studentsCopy.sort((studentA, studentB) => {
    const dirIf = dir === false ? studentA[prop] < studentB[prop] : studentA[prop] > studentB[prop];

    if (!dirIf) {
      return -1;
    }

    return 1;
  });
}

// События сортировки
$studentsListTHAll.forEach((element) => {
  element.addEventListener('click', function () {
    column = this.dataset.column;
    columnDir = !columnDir;
    render();
  });
});

// Отрисовать
function render() {
  let studentsCopy = [...students];

  studentsCopy = getSortStudents(column, columnDir);

  while ($studentsList.lastChild) {
    $studentsList.removeChild($studentsList.lastChild);
  }

  for (const student of studentsCopy) {
    $studentsList.append(newStudentTR(student));
  }
}

export { render, students };
