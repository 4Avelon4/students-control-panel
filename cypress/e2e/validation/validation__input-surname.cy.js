import { API_BASE_URL } from '../../../src/js/config/path';

describe('Тестирование поля ввода "Фамилия"', () => {
  beforeEach(() => {
    // cy.visit('http://localhost:3000');
    cy.visit('http://localhost:4200/');

    cy.request('GET', `${API_BASE_URL}/api/students`, { timeout: 3000 }).then((response) => {
      expect(response).to.have.property('status', 200);
    });
  });

  describe('Тестирование ввода корректных значений', () => {
    describe('Ввод корректных значений', () => {
      it('Фамилия', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="surname"]').type('Фамилия');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="surname"]').should('not.have.class', 'is-invalid');
      });

      it('Фамилия-Фамилия', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="surname"]').type('Фамилия-Фамилия');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="surname"]').should('not.have.class', 'is-invalid');
      });
    });
  });

  describe('Тестирование ввода некорректных значений', () => {
    it('Пустые данные не проходят валидацию', () => {
      cy.get('#add-student-btn').click();
      cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
      cy.get('input[name="surname"]').should('have.class', 'is-invalid');
    });

    describe('Ввод слова с маленькой бувы не проходит валидацию', () => {
      it('фамилия', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="surname"]').type('фамилия');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="surname"]').should('have.class', 'is-invalid');
      });
    });

    describe('Ввод цифр не проходит валидацию', () => {
      it('Фамилия111', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="surname"]').type('Фамилия111');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="surname"]').should('have.class', 'is-invalid');
      });

      it('1111', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="surname"]').type('1111');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="surname"]').should('have.class', 'is-invalid');
      });

      it('111Фамилия', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="surname"]').type('111Фамилия');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="surname"]').should('have.class', 'is-invalid');
      });

      it('111Фамилия 00', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="surname"]').type('111Фамилия 00');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="surname"]').should('have.class', 'is-invalid');
      });
    });

    describe('Ввод букв не принадлежащих русскому алфавиту не проходит валидацию', () => {
      it('Surname', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="surname"]').type('Surname');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="surname"]').should('have.class', 'is-invalid');
      });

      it('姓', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="surname"]').type('姓');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="surname"]').should('have.class', 'is-invalid');
      });
    });

    describe('Ввод символов не принадлежащих русскому алфавиту и не являющихся дефисом не проходит валидацию', () => {
      it('(Фамилия)', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="surname"]').type('(Фамилия)');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="surname"]').should('have.class', 'is-invalid');
      });

      it('Фамилия–Фамилия', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="surname"]').type('Фамилия–Фамилия');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="surname"]').should('have.class', 'is-invalid');
      });

      it('! Фамилия _', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="surname"]').type('! Фамилия _');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="surname"]').should('have.class', 'is-invalid');
      });

      it('-!@#$%^&*', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="surname"]').type('-!@#$%^&*');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="surname"]').should('have.class', 'is-invalid');
      });
    });
  });
});
