import Student from '../../src/js/student/student';

describe('Проверка класса Student', () => {
  const student = new Student(
    '12345678',
    'Максим',
    'Егоров',
    'Сергеевич',
    'Информационных технологий',
    new Date(1994, 10, 7),
    2020
  );

  test('Должен вернуть корректные данные при вызове свойства id', () => {
    expect(student.id).toStrictEqual('12345678');
  });

  test('Должен вернуть корректные данные при вызове свойства name', () => {
    expect(student.name).toStrictEqual('Максим');
  });

  test('Должен вернуть корректные данные при вызове свойства surname', () => {
    expect(student.surname).toStrictEqual('Егоров');
  });

  test('Должен вернуть корректные данные при вызове свойства lastname', () => {
    expect(student.lastname).toStrictEqual('Сергеевич');
  });

  test('Должен вернуть корректные данные при вызове свойства faculty', () => {
    expect(student.faculty).toStrictEqual('Информационных технологий');
  });

  test('Должен вернуть корректные данные при вызове метода get fio()', () => {
    expect(student.fio).toStrictEqual('Егоров Максим Сергеевич');
  });

  test('Должен вернуть корректные данные при вызове метода student.getEducationPeriod()', () => {
    expect(student.getEducationPeriod()).toStrictEqual('(4 курс)');
  });

  test('Должен вернуть корректные данные при вызове метода student.getBirthdayString()', () => {
    expect(student.getBirthdayString()).toStrictEqual('07.11.1994');
  });

  test('Должен вернуть корректные данные при вызове метода student.getBirthdayStringInInput()', () => {
    expect(student.getBirthdayStringInInput()).toStrictEqual('1994-11-07');
  });

  test('Должен вернуть корректные данные при вызове метода student.getAge()', () => {
    expect(student.getAge()).toStrictEqual(Number('29'));
  });
});
