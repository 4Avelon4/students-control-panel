import studentRowTable from '../../src/js/table/studentRowTable';
import Student from '../../src/js/student/student';

describe('newStudentTR()', () => {
  const student = new Student(
    '12345678',
    'Максим',
    'Егоров',
    'Сергеевич',
    'Информационных технологий',
    new Date(1994, 10, 7),
    2019
  );

  test('Должна создать строку таблицы с данными студента', () => {
    const expectedText =
      // eslint-disable-next-line max-len
      '<tr class="table-student__row"><td class="table-student__item table-student__item--fio">Егоров Максим Сергеевич</td><td class="table-student__item table-student__item--faculty">Информационных технологий</td><td class="table-student__item table-student__item--birthday">07.11.1994 (28 лет)</td><td class="table-student__item">2019 - 2023 (4 курс)</td></tr>';
    const el = studentRowTable(student);
    expect(el).toBeInstanceOf(HTMLTableRowElement);
    expect(el.outerHTML).toStrictEqual(expectedText);
  });
});
