import Student from '../src/js/student';

describe('Проверка класса Student', () => {
  const student = new Student(
    'Максим',
    'Егоров',
    'Сергеевич',
    'Факультет информационных технологий (ФИТ)',
    new Date(1994, 11, 7),
    2019
  );

  test('Проверка должна возвращать корректные данные при вызове свойства name', () => {
    expect(student.name).toStrictEqual('Максим');
  });

  test('Проверка должна возвращать корректные данные при вызове свойства surname', () => {
    expect(student.surname).toStrictEqual('Егоров');
  });

  test('Проверка должна возвращать корректные данные при вызове свойства lastname', () => {
    expect(student.lastname).toStrictEqual('Сергеевич');
  });

  test('Проверка должна возвращать корректные данные при вызове свойства faculty', () => {
    expect(student.faculty).toStrictEqual('Факультет информационных технологий (ФИТ)');
  });

  test('Проверка должна возвращать корректные данные при вызове метода get fio()', () => {
    expect(student.fio).toStrictEqual('Егоров Максим Сергеевич');
  });

  test('Проверка должна возвращать корректные данные при вызове метода student.getEducationPeriod()', () => {
    expect(student.getEducationPeriod()).toStrictEqual('(3 курс)');
  });

  test('Проверка должна возвращать корректные данные при вызове метода student.getBirthDateString()', () => {
    expect(student.getBirthDateString()).toStrictEqual('07.12.1994');
  });

  test('Проверка должна возвращать корректные данные при вызове метода student.getAge()', () => {
    expect(student.getAge()).toStrictEqual(Number('27'));
  });
});
