import { API_BASE_URL } from '../../../src/js/config/path';

describe('Тестирование поля ввода "Год начала обучения"', () => {
  beforeEach(() => {
    // cy.visit('http://localhost:3000');
    cy.visit('http://localhost:4200/');

    cy.request('GET', `${API_BASE_URL}/api/students`, { timeout: 3000 }).then((response) => {
      expect(response).to.have.property('status', 200);
    });
  });

  describe('Тестирование ввода корректных значений', () => {
    describe('Ввод корректных значений', () => {
      it('2000', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="studyStart"]').type('2000');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="studyStart"]').should('not.have.class', 'is-invalid');
      });

      it('2010', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="studyStart"]').type('2010');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="studyStart"]').should('not.have.class', 'is-invalid');
      });

      it('2021', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="studyStart"]').type('2021');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="studyStart"]').should('not.have.class', 'is-invalid');
      });
    });
  });

  describe('Тестирование ввода некорректных значений', () => {
    it('Пустые данные не проходят валидацию', () => {
      cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', { timeout: 3000 })
        .should('be.visible')
        .click();
      cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
      cy.get('input[name="studyStart"]').should('have.class', 'is-invalid');
    });

    describe('Ввод года начала обучения не входящего в диапазон от 2000 года не проходит валидацию', () => {
      it('1999', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="studyStart"]').type('1999');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="studyStart"]').should('have.class', 'is-invalid');
      });

      it('1800', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="studyStart"]').type('1800');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="studyStart"]').should('have.class', 'is-invalid');
      });
    });

    describe('Ввод года начала обучения превышающего текущую дату не проходит валидацию', () => {
      const today = new Date().getFullYear();

      it(`${today + 1}`, () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="studyStart"]').type(`${today + 1}`);
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="studyStart"]').should('have.class', 'is-invalid');
      });

      it('2100', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="studyStart"]').type('2100');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="studyStart"]').should('have.class', 'is-invalid');
      });
    });

    describe('Ввод года начала обучения который не превышает даты рождения не проходит валидацию', () => {
      it('Дата рождения 10.10.2001, Год начала обучения 2000', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="birthday"]').type('2001-10-10');
        cy.get('input[name="studyStart"]').type('2000');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="studyStart"]').should('have.class', 'is-invalid');
      });

      describe('Ввод года начала обучения превышающего дату рождения менее чем на 5 лет не проходит валидацию', () => {
        it('Дата рождения 10.10.1998, Год начала обучения 2000', () => {
          cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
            timeout: 3000,
          })
            .should('be.visible')
            .click();
          cy.get('input[name="birthday"]').type('1998-10-10');
          cy.get('input[name="studyStart"]').type('2000');
          cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
          cy.get('input[name="studyStart"]').should('have.class', 'is-invalid');
        });
      });
    });
  });
});
