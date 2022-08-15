import getToday from '../../support/getToday';

describe('Тестирование поля ввода "Дата рождения"', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  describe('Тестирование ввода корректных значений', () => {
    describe('Ввод корректных значений', () => {
      it('10.10.1998', () => {
        cy.get('input[name="birthDate"]').type('1998-10-10');
        cy.get('#form-add-student').submit();
        cy.get('input[name="birthDate"]').should('not.have.class', 'is-invalid');
      });

      it('01.08.1990', () => {
        cy.get('input[name="birthDate"]').type('1990-08-01');
        cy.get('#form-add-student').submit();
        cy.get('input[name="birthDate"]').should('not.have.class', 'is-invalid');
      });

      it('25.11.2006', () => {
        cy.get('input[name="birthDate"]').type('2006-11-25');
        cy.get('#form-add-student').submit();
        cy.get('input[name="birthDate"]').should('not.have.class', 'is-invalid');
      });
    });
  });

  describe('Тестирование ввода некорректных значений', () => {
    it('Пустые данные не проходят валидацию', () => {
      cy.get('#form-add-student').submit();
      cy.get('input[name="birthDate"]').should('have.class', 'is-invalid');
    });

    describe('Ввод даты рождения не входящей в диапазон от 1900 года не проходит валидацию', () => {
      it('05.02.1899', () => {
        cy.get('input[name="birthDate"]').type('1899-02-05');
        cy.get('#form-add-student').submit();
        cy.get('input[name="birthDate"]').should('have.class', 'is-invalid');
      });
    });

    describe('Ввод даты рождения превышающей текущую дату не проходит валидацию', () => {
      const today = getToday();

      it(`${today.day}.${today.month}.${today.year + 1}`, () => {
        cy.get('input[name="birthDate"]').type(`${today.year}-${today.month}-${today.day}`);
        cy.get('#form-add-student').submit();
        cy.get('input[name="birthDate"]').should('have.class', 'is-invalid');
      });
    });

    describe('Ввод даты рождения не превышающей текущую дату менее чем на 5 лет не проходит валидацию', () => {
      const today = getToday();

      it(`${today.day}.${today.month}.${today.year}`, () => {
        cy.get('input[name="birthDate"]').type(`${today.year}-${today.month}-${today.day}`);
        cy.get('#form-add-student').submit();
        cy.get('input[name="birthDate"]').should('have.class', 'is-invalid');
      });
    });
  });
});
