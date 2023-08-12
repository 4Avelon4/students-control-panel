import { getValidateInputValue, inputValidation } from '../../src/js/validation/formValidation';

const errors = [];

describe('getValidateInputValue()', () => {
  const testArrayValuesTrue = [
    { name: 'surname', value: 'Мамин-Сибиряк' },
    { name: 'name', value: 'Жан-Жак' },
    { name: 'lastname', value: 'Владимирович' },
    { name: 'faculty', value: 'Математический' },
    { name: 'birthday', value: '10.10.1991' },
    { name: 'studyStart', value: '2010' },
  ];

  for (const inputObj of testArrayValuesTrue) {
    // eslint-disable-next-line max-len
    test(`Должна пропустить корректные значения вида "${inputObj.value}"`, () => {
      expect(getValidateInputValue(inputObj, errors)).toStrictEqual([]);
    });
  }
});

// Проверка ввода неверных данных
describe('getValidateInputValue()', () => {
  const testArrayValuesFalse = [
    { name: 'surname', value: 'мамин-Сибиряк' },
    { name: 'name', value: 'Jhon' },
    { name: 'lastname', value: '1Владимирович' },
    { name: 'faculty', value: 'МатематическиЙ' },
    { name: 'birthday', value: '10.10.1899' },
    { name: 'studyStart', value: '1999' },
  ];

  for (const inputObj of testArrayValuesFalse) {
    // eslint-disable-next-line max-len
    test(`Не должна пропустить некорректные значения вида "${inputObj.value}"`, () => {
      expect(getValidateInputValue(inputObj, errors)).not.toStrictEqual([]);
    });
  }
});

// Проверка выбрасывания исключения при вводе неверных данных
// eslint-disable-next-line max-len
describe('getValidateInputValue()', () => {
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
    birthday: {
      inputObj: { name: 'birthday', value: '10.10.2029' },
    },
    studyStart: {
      inputObj: { name: 'studyStart', value: '2039' },
    },
  };

  for (const inputFormArray of Object.keys(testInputFormArrayFalse)) {
    test(`Должна выбросить исключение TypeError при вводе некорректных данных в поле ${inputFormArray}`, () => {
      // eslint-disable-next-line jest/valid-expect
      expect(() => {
        inputValidation(inputFormArray, errors);
      }).toThrow();
    });
  }
});
