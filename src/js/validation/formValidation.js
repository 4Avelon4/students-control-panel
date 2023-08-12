const inputs = {};
let birthdayValue = null;

function getValidateInputValue(inputObj, errorsObj) {
  const inputValue = inputObj.value.trim();

  if (inputValue === '') {
    errorsObj.push({
      name: `${inputObj.name}`,
      message: 'Обязательное поле',
    });

    return errorsObj;
  }

  // Валидация полей ФИО
  if (['surname', 'name', 'lastname'].includes(inputObj.name)) {
    if (!/^[А-ЯЁ][а-яё]*(?:-[А-ЯЁ][а-яё]*)?$/.test(inputValue)) {
      errorsObj.push({
        name: `${inputObj.name}`,
        message:
          'Каждое слово должно начинаться с большой буквы и содержать только буквы русского алфавита и символ дефиса',
      });

      return errorsObj;
    }
    if (inputValue.length > 40) {
      errorsObj.push({
        name: `${inputObj.name}`,
        message: 'Строка не должна быть длиннее 40 символов',
      });
    }
  }

  // Валидация поля Факультет
  if (inputObj.name === 'faculty') {
    if (!/^[А-ЯЁ][а-яё]*([- ]{1}[а-яё]*)*$/.test(inputValue)) {
      errorsObj.push({
        name: `${inputObj.name}`,
        message:
          // eslint-disable-next-line max-len
          'Строка должна начинаться с большой буквы и содержать только буквы русского алфавита и символ пробела или дефис',
      });
    }
  }

  // Валидация поля Дата рождения
  if (inputObj.name === 'birthday') {
    const today = new Date();
    birthdayValue = new Date(inputValue);

    if (new Date(inputValue) < new Date('01.01.1900')) {
      errorsObj.push({
        name: `${inputObj.name}`,
        message: 'Дата рождения должна находиться в диапазоне от 01.01.1900',
      });

      return errorsObj;
    }

    if (new Date(inputValue) >= today) {
      errorsObj.push({
        name: `${inputObj.name}`,
        message: 'Дата рождения позже текущей даты',
      });

      return errorsObj;
    }

    if (new Date(inputValue).getFullYear() >= today.getFullYear() - 5) {
      errorsObj.push({
        name: `${inputObj.name}`,
        message: 'Студент такого возраста не может поступить в данное учебное заведение',
      });
    }
  }

  // Валидация поля Год начала обучения
  if (inputObj.name === 'studyStart') {
    const today = new Date().getFullYear();

    if (+inputValue < 2000 || +inputValue > today) {
      errorsObj.push({
        name: `${inputObj.name}`,
        message: 'Год начала обучения должен находиться в диапазоне от 2000-го до текущего года',
      });

      return errorsObj;
    }

    if (!birthdayValue) {
      return errorsObj;
    }

    if (+inputValue < birthdayValue.getFullYear()) {
      errorsObj.push({
        name: `${inputObj.name}`,
        message: 'Год начала обучения не может превышать год рождения',
      });

      return errorsObj;
    }

    if (+inputValue - 5 < birthdayValue.getFullYear()) {
      errorsObj.push({
        name: `${inputObj.name}`,
        message: 'Студент такого возраста не может поступить в данное учебное заведение',
      });
    }
  }

  return errorsObj;
}

function inputValidation(inputFormArray, errors) {
  for (let i = 0; i < inputFormArray.length; i++) {
    inputs[inputFormArray[i].name] = inputFormArray[i];

    getValidateInputValue(inputFormArray[i], errors);

    // Убираем сообщение об ошибке если оно было
    if (inputs[inputFormArray[i].name].classList.contains('is-invalid')) {
      const $inValideFeedbackRemoved = inputs[inputFormArray[i].name].parentNode.querySelector('.invalid-feedback');

      $inValideFeedbackRemoved.textContent = '';
      inputs[inputFormArray[i].name].classList.remove('is-invalid');
    }

    inputs[inputFormArray[i].name].classList.add('is-valid');
  }

  if (errors.length) {
    const err = new TypeError();
    err.errorMessages = errors;
    throw err;
  }
}

export { inputs, inputValidation, getValidateInputValue };
// export { inputs, inputValidation };
