import { API_BASE_URL } from '../../../src/js/config/path';

describe('Тестирование поля ввода "Отчество"', () => {
  beforeEach(() => {
    // cy.visit('http://localhost:3000');
    cy.visit('http://localhost:4200/');

    cy.request('GET', `${API_BASE_URL}/api/students`, { timeout: 3000 }).then((response) => {
      expect(response).to.have.property('status', 200);
    });
  });

  describe('Тестирование ввода корректных значений', () => {
    describe('Ввод корректных значений', () => {
      it('Отчество', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="lastname"]').type('Отчество');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="lastname"]').should('not.have.class', 'is-invalid');
      });

      it('Отчество-Отчество', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="lastname"]').type('Отчество-Отчество');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="lastname"]').should('not.have.class', 'is-invalid');
      });
    });
  });

  describe('Тестирование ввода некорректных значений', () => {
    it('Пустые данные не проходят валидацию', () => {
      cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', { timeout: 3000 })
        .should('be.visible')
        .click();
      cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
      cy.get('input[name="lastname"]').should('have.class', 'is-invalid');
    });

    describe('Ввод слова с маленькой бувы не проходит валидацию', () => {
      it('отчество', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="lastname"]').type('отчество');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="lastname"]').should('have.class', 'is-invalid');
      });
    });

    describe('Ввод цифр не проходит валидацию', () => {
      it('Отчество111', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="lastname"]').type('Отчество111');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="lastname"]').should('have.class', 'is-invalid');
      });

      it('1111', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="lastname"]').type('1111');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="lastname"]').should('have.class', 'is-invalid');
      });

      it('111Отчество', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="lastname"]').type('111Отчество');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="lastname"]').should('have.class', 'is-invalid');
      });

      it('111Отчество 00', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="lastname"]').type('111Отчество 00');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="lastname"]').should('have.class', 'is-invalid');
      });
    });

    describe('Ввод букв не принадлежащих русскому алфавиту не проходит валидацию', () => {
      it('Lastname', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="lastname"]').type('Lastname');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="lastname"]').should('have.class', 'is-invalid');
      });

      it('ミドルネーム', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="lastname"]').type('ミドルネーム');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="lastname"]').should('have.class', 'is-invalid');
      });
    });

    describe('Ввод символов не принадлежащих русскому алфавиту и не являющихся дефисом не проходит валидацию', () => {
      it('(Отчество)', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="lastname"]').type('(Отчество)');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="lastname"]').should('have.class', 'is-invalid');
      });

      it('Отчество–Отчество', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="lastname"]').type('Отчество–Отчество');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="lastname"]').should('have.class', 'is-invalid');
      });

      it('! Отчество _', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="lastname"]').type('! Отчество _');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="lastname"]').should('have.class', 'is-invalid');
      });

      it('-!@#$%^&*', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="lastname"]').type('-!@#$%^&*');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="lastname"]').should('have.class', 'is-invalid');
      });
    });
  });
});
