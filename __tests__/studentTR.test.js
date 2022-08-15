import newStudentTR from '../src/js/studentTR';
import Student from '../src/js/student';

describe('Проверка функции newStudentTR()', () => {
  const student = new Student(
    'Максим',
    'Егоров',
    'Сергеевич',
    'Факультет фундаментальной физико-химической инженерии',
    new Date(1994, 11, 7),
    2015
  );

  test('Функция newStudentTR должна создать строку таблицы с данными студента', () => {
    const expectedText =
      // eslint-disable-next-line max-len
      '<tr class="table-student__row"><td class="table-student__item">Егоров Максим Сергеевич</td><td class="table-student__item">Факультет фундаментальной физико-химической инженерии</td><td class="table-student__item">07.12.1994 (27 лет)</td><td class="table-student__item">2015 - 2019 (закончил)</td></tr>';
    const el = newStudentTR(student);
    expect(el).toBeInstanceOf(HTMLTableRowElement);
    expect(el.outerHTML).toStrictEqual(expectedText);
  });
});
