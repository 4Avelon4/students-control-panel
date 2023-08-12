import { API_BASE_URL } from '../../../src/js/config/path';

describe('Тестирование поля ввода "Факультет"', () => {
  beforeEach(() => {
    // cy.visit('http://localhost:3000');
    cy.visit('http://localhost:4200/');

    cy.request('GET', `${API_BASE_URL}/api/students`, { timeout: 3000 }).then((response) => {
      expect(response).to.have.property('status', 200);
    });
  });

  describe('Тестирование ввода корректных значений', () => {
    it('Ввод корректных значений', () => {
      it('Фундаментальной физико-химической инженерии', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="faculty"]').type('Фундаментальной физико-химической инженерии');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="faculty"]').should('not.have.class', 'is-invalid');
      });

      it('Механико-математический', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="faculty"]').type('Механико-математический');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="faculty"]').should('not.have.class', 'is-invalid');
      });
    });
  });

  describe('Тестирование ввода некорректных значений', () => {
    it('Пустые данные не проходят валидацию', () => {
      cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', { timeout: 3000 })
        .should('be.visible')
        .click();
      cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
      cy.get('input[name="faculty"]').should('have.class', 'is-invalid');
    });

    describe('Ввод слова с маленькой бувы не проходит валидацию', () => {
      it('филологический', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="faculty"]').type('филологический');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="faculty"]').should('have.class', 'is-invalid');
      });
    });

    describe('Ввод цифр не проходит валидацию', () => {
      it('Филологический111', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="faculty"]').type('Филологический111');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="faculty"]').should('have.class', 'is-invalid');
      });

      it('Фундаментальной физико-химическ111й инженерии', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="faculty"]').type('Фундаментальной физико-химическ111й инженерии');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();

        cy.get('input[name="faculty"]').should('have.class', 'is-invalid');
      });

      it('1111', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="faculty"]').type('1111');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="faculty"]').should('have.class', 'is-invalid');
      });

      it('111Филологический', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="faculty"]').type('111Филологический');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="faculty"]').should('have.class', 'is-invalid');
      });

      it('111Филологический 00', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="faculty"]').type('111Филологический 00');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="faculty"]').should('have.class', 'is-invalid');
      });
    });

    describe('Ввод букв не принадлежащих русскому алфавиту не проходит валидацию', () => {
      it('Philological', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="faculty"]').type('Philological');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="faculty"]').should('have.class', 'is-invalid');
      });

      it('文献学', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="faculty"]').type('文献学');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="faculty"]').should('have.class', 'is-invalid');
      });
    });

    // eslint-disable-next-line max-len
    describe('Ввод символов не принадлежащих русскому алфавиту и не являющихся дефисом или пробелом не проходит валидацию', () => {
      it('(Филологический)', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="faculty"]').type('(Филологический)');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="faculty"]').should('have.class', 'is-invalid');
      });

      it('Механико–математический', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="faculty"]').type('Механико–математический');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="faculty"]').should('have.class', 'is-invalid');
      });

      it('! Филологический _', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="faculty"]').type('! Филологический _');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="faculty"]').should('have.class', 'is-invalid');
      });

      it('-!@#$%^&*', () => {
        cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', {
          timeout: 3000,
        })
          .should('be.visible')
          .click();
        cy.get('input[name="faculty"]').type('-!@#$%^&*');
        cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').should('be.visible').click();
        cy.get('input[name="faculty"]').should('have.class', 'is-invalid');
      });
    });
  });
});
