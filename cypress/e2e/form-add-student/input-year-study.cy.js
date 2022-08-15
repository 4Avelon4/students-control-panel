describe('Тестирование поля ввода "Год начала обучения"', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  describe('Тестирование ввода корректных значений', () => {
    describe('Ввод корректных значений', () => {
      it('2000', () => {
        cy.get('input[name="yearStudy"]').type('2000');
        cy.get('#form-add-student').submit();
        cy.get('input[name="yearStudy"]').should('not.have.class', 'is-invalid');
      });

      it('2010', () => {
        cy.get('input[name="yearStudy"]').type('2010');
        cy.get('#form-add-student').submit();
        cy.get('input[name="yearStudy"]').should('not.have.class', 'is-invalid');
      });

      it('2021', () => {
        cy.get('input[name="yearStudy"]').type('2021');
        cy.get('#form-add-student').submit();
        cy.get('input[name="yearStudy"]').should('not.have.class', 'is-invalid');
      });
    });
  });

  describe('Тестирование ввода некорректных значений', () => {
    it('Пустые данные не проходят валидацию', () => {
      cy.get('#form-add-student').submit();
      cy.get('input[name="yearStudy"]').should('have.class', 'is-invalid');
    });

    describe('Ввод года начала обучения не входящего в диапазон от 2000 года не проходит валидацию', () => {
      it('1999', () => {
        cy.get('input[name="yearStudy"]').type('1999');
        cy.get('#form-add-student').submit();
        cy.get('input[name="yearStudy"]').should('have.class', 'is-invalid');
      });

      it('1800', () => {
        cy.get('input[name="yearStudy"]').type('1800');
        cy.get('#form-add-student').submit();
        cy.get('input[name="yearStudy"]').should('have.class', 'is-invalid');
      });
    });

    describe('Ввод года начала обучения превышающего текущую дату не проходит валидацию', () => {
      const today = new Date().getFullYear();

      it(`${today + 1}`, () => {
        cy.get('input[name="yearStudy"]').type(`${today + 1}`);
        cy.get('#form-add-student').submit();
        cy.get('input[name="yearStudy"]').should('have.class', 'is-invalid');
      });

      it('2100', () => {
        cy.get('input[name="yearStudy"]').type('2100');
        cy.get('#form-add-student').submit();
        cy.get('input[name="yearStudy"]').should('have.class', 'is-invalid');
      });
    });

    describe('Ввод года начала обучения который не превышает даты рождения не проходит валидацию', () => {
      it('Дата рождения 10.10.2001, Год начала обучения 2000', () => {
        cy.get('input[name="birthDate"]').type('2001-10-10');
        cy.get('input[name="yearStudy"]').type('2000');
        cy.get('#form-add-student').submit();
        cy.get('input[name="yearStudy"]').should('have.class', 'is-invalid');
      });

      describe('Ввод года начала обучения превышающего дату рождения менее чем на 5 лет не проходит валидацию', () => {
        it('Дата рождения 10.10.1998, Год начала обучения 2000', () => {
          cy.get('input[name="birthDate"]').type('1998-10-10');
          cy.get('input[name="yearStudy"]').type('2000');
          cy.get('#form-add-student').submit();
          cy.get('input[name="yearStudy"]').should('have.class', 'is-invalid');
        });
      });
    });
  });
});
