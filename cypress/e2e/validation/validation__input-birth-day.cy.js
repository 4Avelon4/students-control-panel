import { API_BASE_URL } from '../../../src/js/config/path';
import getToday from '../../support/getToday';

describe('Тестирование поля ввода "Дата рождения"', () => {
  beforeEach(() => {
    // cy.visit('http://localhost:3000');
    cy.visit('http://localhost:4200/');

    cy.request('GET', `${API_BASE_URL}/api/students`, { timeout: 3000 }).then((response) => {
      expect(response).to.have.property('status', 200);
    });
  });

  describe('Тестирование ввода корректных значений', () => {
    it('10.10.1998', () => {
      cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', { timeout: 3000 })
        .should('be.visible')
        .click();
      cy.get('input[name="birthday"]').type('1998-10-10');
      cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
      cy.get('input[name="birthday"]').should('not.have.class', 'is-invalid');
    });

    it('01.08.1990', () => {
      cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', { timeout: 3000 })
        .should('be.visible')
        .click();
      cy.get('input[name="birthday"]').type('1990-08-01');
      cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
      cy.get('input[name="birthday"]').should('not.have.class', 'is-invalid');
    });

    it('25.11.2006', () => {
      cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', { timeout: 3000 })
        .should('be.visible')
        .click();
      cy.get('input[name="birthday"]').type('2006-11-25');
      cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
      cy.get('input[name="birthday"]').should('not.have.class', 'is-invalid');
    });
  });

  describe('Тестирование ввода некорректных значений', () => {
    it('Пустые данные не проходят валидацию', () => {
      cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', { timeout: 3000 })
        .should('be.visible')
        .click();
      cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
      cy.get('input[name="birthday"]').should('have.class', 'is-invalid');
    });

    describe('Ввод даты рождения не входящей в диапазон от 1900 года не проходит валидацию', () => {
      it('05.02.1899', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="birthday"]').type('1899-02-05');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="birthday"]').should('have.class', 'is-invalid');
      });
    });

    describe('Ввод даты рождения превышающей текущую дату не проходит валидацию', () => {
      const today = getToday();

      it(`${today.day}.${today.month}.${today.year + 1}`, () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="birthday"]').type(`${today.year}-${today.month}-${today.day}`);
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="birthday"]').should('have.class', 'is-invalid');
      });
    });

    describe('Ввод даты рождения не превышающей текущую дату менее чем на 5 лет не проходит валидацию', () => {
      const today = getToday();

      it(`${today.day}.${today.month}.${today.year}`, () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="birthday"]').type(`${today.year}-${today.month}-${today.day}`);
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="birthday"]').should('have.class', 'is-invalid');
      });
    });
  });
});
