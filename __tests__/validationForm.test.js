import { getValidateInputValue, inputValidation } from '../src/js/validationForm';

const errors = [];

describe('Проверка функции getValidateInputValue() на ввод корректных данных', () => {
  const testArrayValuesTrue = [
    { name: 'surname', value: 'Мамин-Сибиряк' },
    { name: 'name', value: 'Жан-Жак' },
    { name: 'lastname', value: 'Владимирович' },
    { name: 'faculty', value: 'Математический' },
    { name: 'birthDate', value: '10.10.1991' },
    { name: 'yearStudy', value: '2010' },
  ];

  for (const inputObj of testArrayValuesTrue) {
    // eslint-disable-next-line max-len
    test(`Проверка ввода данных в поле ${inputObj.name} должна пропускать корректные значения вида "${inputObj.value}"`, () => {
      expect(getValidateInputValue(inputObj, errors)).toStrictEqual([]);
    });
  }
});

// Проверка ввода неверных данных
describe('Проверка функции getValidateInputValue() на ввод некорректных данных', () => {
  const testArrayValuesFalse = [
    { name: 'surname', value: 'мамин-Сибиряк' },
    { name: 'name', value: 'Jhon' },
    { name: 'lastname', value: '1Владимирович' },
    { name: 'faculty', value: 'МатематическиЙ' },
    { name: 'birthDate', value: '10.10.1899' },
    { name: 'yearStudy', value: '1999' },
  ];

  for (const inputObj of testArrayValuesFalse) {
    // eslint-disable-next-line max-len
    test(`Проверка ввода данных в поле ${inputObj.name} недолжна пропускать некорректные значения вида "${inputObj.value}"`, () => {
      expect(getValidateInputValue(inputObj, errors)).not.toStrictEqual([]);
    });
  }
});

// Проверка выбрасывания исключения при вводе неверных данных
// eslint-disable-next-line max-len
describe('Проверка выбрасывания исключения TypeError при вводе некотррекных данных в функцию getValidateInputValue()', () => {
  const testInputFormArrayFalse = {
    surname: {
      inputObj: { name: 'surname', value: '11BadSurname' },
    },
    name: {
      inputObj: { name: 'name', value: '' },
    },
    lastname: {
      inputObj: { name: 'lastname', value: 'плохаяфамилия' },
    },
    faculty: {
      inputObj: { name: 'faculty', value: '12Математический' },
    },
    birthDate: {
      inputObj: { name: 'birthDate', value: '10.10.2029' },
    },
    yearStudy: {
      inputObj: { name: 'yearStudy', value: '2039' },
    },
  };

  for (const inputFormArray of Object.keys(testInputFormArrayFalse)) {
    test(`Проверка выбрасывания исключения TypeError при вводе некорректных данных в поле ${inputFormArray}`, () => {
      // eslint-disable-next-line jest/valid-expect
      expect(() => {
        inputValidation(inputFormArray, errors);
      }).toThrow();
    });
  }
});
