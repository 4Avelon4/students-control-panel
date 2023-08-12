import { API_BASE_URL } from '../../../src/js/config/path';

describe('Тестирование поля ввода "Имя"', () => {
  beforeEach(() => {
    // cy.visit('http://localhost:3000');
    cy.visit('http://localhost:4200/');

    cy.request('GET', `${API_BASE_URL}/api/students`, { timeout: 3000 }).then((response) => {
      expect(response).to.have.property('status', 200);
    });
  });

  describe('Тестирование ввода корректных значений', () => {
    describe('Ввод корректных значений', () => {
      it('Имя', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="name"]').type('Имя');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="name"]').should('not.have.class', 'is-invalid');
      });

      it('Имя-Имя', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="name"]').type('Имя-Имя');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="name"]').should('not.have.class', 'is-invalid');
      });
    });
  });

  describe('Тестирование ввода некорректных значений', () => {
    it('Пустые данные не проходят валидацию', () => {
      cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', { timeout: 3000 })
        .should('be.visible')
        .click();
      cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
      cy.get('input[name="name"]').should('have.class', 'is-invalid');
    });

    describe('Ввод слова с маленькой бувы не проходит валидацию', () => {
      it('имя', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="name"]').type('имя');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="name"]').should('have.class', 'is-invalid');
      });
    });

    describe('Ввод цифр не проходит валидацию', () => {
      it('Имя111', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="name"]').type('Имя111');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="name"]').should('have.class', 'is-invalid');
      });

      it('1111', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="name"]').type('1111');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="name"]').should('have.class', 'is-invalid');
      });

      it('111Имя', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="name"]').type('111Имя');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="name"]').should('have.class', 'is-invalid');
      });

      it('111Имя 00', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="name"]').type('111Имя 00');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="name"]').should('have.class', 'is-invalid');
      });
    });

    describe('Ввод букв не принадлежащих русскому алфавиту не проходит валидацию', () => {
      it('Name', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="name"]').type('Name');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="name"]').should('have.class', 'is-invalid');
      });

      it('名前', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="name"]').type('名前');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="name"]').should('have.class', 'is-invalid');
      });
    });

    describe('Ввод символов не принадлежащих русскому алфавиту и не являющихся дефисом не проходит валидацию', () => {
      it('(Имя)', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="name"]').type('(Имя)');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="name"]').should('have.class', 'is-invalid');
      });

      it('Имя–Имя', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="name"]').type('Имя–Имя');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="name"]').should('have.class', 'is-invalid');
      });

      it('! Имя _', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="name"]').type('! Имя _');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="name"]').should('have.class', 'is-invalid');
      });

      it('-!@#$%^&*', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="name"]').type('-!@#$%^&*');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="name"]').should('have.class', 'is-invalid');
      });
    });
  });
});
