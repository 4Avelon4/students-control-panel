import { activeStudentID } from '../config/activeStudentID';
import { clearForm, getStudent } from '../form/clearForm';
import { serverDeleteStudent } from './serverInteraction';
import pushStudentValidation from '../validation/pushStudentValidation';
import { pushStudentBase, changeStudentBase } from './baseInteraction';
import { renderTable } from '../table/renderTable';

const $formTitle = document.getElementById('form-title');
const $formSubmitButton = document.getElementById('form-submit-button');

const $popap = document.querySelector('.popap');
const $deleteInfo = document.querySelector('.delete-info');
const $form = document.querySelector('.section-form');

const $exitForm = document.querySelector('.section-form__button-deactivate');
const $exitDelete = document.querySelector('.delete-info__btn-deactivate');

const $tabelBody = document.querySelector('.table-student__wrapper-body');

let actionAdd = false;

function setOverflowBody(flag) {
  if (flag) {
    document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.paddingRight = null;
    document.body.style.overflow = null;
  }
}

function openForm(contentTitle, contentButton) {
  $formTitle.textContent = contentTitle;
  $formSubmitButton.textContent = contentButton;

  $form.classList.add('active');
  $popap.classList.add('active');
}

const scrollUp = {
  el: document.getElementById('button-scroll'),

  show() {
    this.el.classList.remove('hide');
  },

  hide() {
    this.el.classList.add('hide');
  },

  addEventListener() {
    $tabelBody.addEventListener('scroll', () => {
      const scrollY = $tabelBody.scrollY || $tabelBody.scrollTop;

      scrollY > 200 ? this.show() : this.hide();
    });

    document.getElementById('button-scroll').onclick = () => {
      $tabelBody.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    };
  },
};

const addStudentButton = {
  el: document.getElementById('add-student-btn'),

  addEventListener() {
    this.el.addEventListener('click', () => {
      actionAdd = true;

      clearForm();
      openForm('Добавить студента', 'Добавить');
      setOverflowBody(true);
    });
  },
};

const changeStudentButton = {
  el: document.getElementById('change-student-btn'),

  addEventListener() {
    this.el.addEventListener('click', () => {
      actionAdd = false;

      openForm('Редактировать студента', 'Сохранить');
      getStudent(activeStudentID.id);
      setOverflowBody(true);
    });
  },
};

const daleteStudentButton = {
  el: document.getElementById('delete-student-btn'),

  addEventListener() {
    this.el.addEventListener('click', () => {
      $deleteInfo.classList.add('active');
      $popap.classList.add('active');

      setOverflowBody(true);
    });
  },
};

const daleteStudentButtonFromBase = {
  el: document.getElementById('delete-student-btn-from-base'),

  addEventListener() {
    this.el.addEventListener('click', () => {
      serverDeleteStudent(activeStudentID.id);
      renderTable();
      setOverflowBody(false);

      $deleteInfo.classList.remove('active');
      $popap.classList.remove('active');
    });
  },
};

export default function panelInteraction() {
  scrollUp.addEventListener();
  addStudentButton.addEventListener();
  changeStudentButton.addEventListener();
  daleteStudentButton.addEventListener();
  daleteStudentButtonFromBase.addEventListener();

  [$exitForm, $exitDelete, $popap].forEach((el) => {
    el.addEventListener('click', () => {
      $form.classList.remove('active');
      $deleteInfo.classList.remove('active');
      $popap.classList.remove('active');

      setOverflowBody(false);
      clearForm();
    });
  });

  document.getElementById('form-add-student').addEventListener('submit', function (event) {
    event.preventDefault();

    const validation = pushStudentValidation();

    if (validation) {
      if (actionAdd) {
        pushStudentBase();
      } else {
        changeStudentBase();
      }
    }
  });
}
