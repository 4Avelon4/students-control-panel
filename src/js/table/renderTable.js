import studentRowTable from './studentRowTable';
import { serverGetAllStudents } from '../interaction/serverInteraction';
import Student from '../student/student';

// eslint-disable-next-line import/no-mutable-exports, prefer-const
let listStudents = [];

async function getListStudentsFromServer() {
  const serverData = await serverGetAllStudents();

  if (serverData) {
    listStudents = [];

    for (const item of serverData) {
      listStudents.push(
        new Student(item.id, item.name, item.surname, item.lastname, item.faculty, item.birthday, item.studyStart)
      );
    }
  }

  return listStudents;
}

const $studentsList = document.getElementById('list-student');
const $studentsListTHAll = document.querySelectorAll('.table-student__column');

let [column, columnDir] = ['fio', true];

// Получить сортировку массива по параметрам
function getSortStudents(prop, dir) {
  const studentsCopy = [...listStudents];

  return studentsCopy.sort((studentA, studentB) => {
    const dirIf = dir === false ? studentA[prop] < studentB[prop] : studentA[prop] > studentB[prop];

    if (!dirIf) {
      return -1;
    }

    return 1;
  });
}

// Отрисовать таблицу
async function renderTable() {
  const serverListStudents = await getListStudentsFromServer();

  let studentsCopy = [...serverListStudents];

  studentsCopy = getSortStudents(column, columnDir);

  while ($studentsList.lastChild) {
    $studentsList.removeChild($studentsList.lastChild);
  }

  for (const student of studentsCopy) {
    $studentsList.append(studentRowTable(student));
  }
}

// События сортировки
$studentsListTHAll.forEach((element) => {
  element.addEventListener('click', function sortTable() {
    column = this.dataset.column;
    columnDir = !columnDir;

    renderTable();
  });
});

export { renderTable, listStudents };
