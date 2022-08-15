describe('Тестирование поля ввода "Фамилия"', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  describe('Тестирование ввода корректных значений', () => {
    describe('Ввод корректных значений', () => {
      it('Фамилия', () => {
        cy.get('input[name="surname"]').type('Фамилия');
        cy.get('#form-add-student').submit();
        cy.get('input[name="surname"]').should('not.have.class', 'is-invalid');
      });

      it('Фамилия-Фамилия', () => {
        cy.get('input[name="surname"]').type('Фамилия-Фамилия');
        cy.get('#form-add-student').submit();
        cy.get('input[name="surname"]').should('not.have.class', 'is-invalid');
      });
    });
  });

  describe('Тестирование ввода некорректных значений', () => {
    it('Пустые данные не проходят валидацию', () => {
      cy.get('#form-add-student').submit();
      cy.get('input[name="surname"]').should('have.class', 'is-invalid');
    });

    describe('Ввод слова с маленькой бувы не проходит валидацию', () => {
      it('фамилия', () => {
        cy.get('input[name="surname"]').type('фамилия');
        cy.get('#form-add-student').submit();
        cy.get('input[name="surname"]').should('have.class', 'is-invalid');
      });
    });

    describe('Ввод цифр не проходит валидацию', () => {
      it('Фамилия111', () => {
        cy.get('input[name="surname"]').type('Фамилия111');
        cy.get('#form-add-student').submit();
        cy.get('input[name="surname"]').should('have.class', 'is-invalid');
      });

      it('1111', () => {
        cy.get('input[name="surname"]').type('1111');
        cy.get('#form-add-student').submit();
        cy.get('input[name="surname"]').should('have.class', 'is-invalid');
      });

      it('111Фамилия', () => {
        cy.get('input[name="surname"]').type('111Фамилия');
        cy.get('#form-add-student').submit();
        cy.get('input[name="surname"]').should('have.class', 'is-invalid');
      });

      it('111Фамилия 00', () => {
        cy.get('input[name="surname"]').type('111Фамилия 00');
        cy.get('#form-add-student').submit();
        cy.get('input[name="surname"]').should('have.class', 'is-invalid');
      });
    });

    describe('Ввод букв не принадлежащих русскому алфавиту не проходит валидацию', () => {
      it('Surname', () => {
        cy.get('input[name="surname"]').type('Surname');
        cy.get('#form-add-student').submit();
        cy.get('input[name="surname"]').should('have.class', 'is-invalid');
      });

      it('姓', () => {
        cy.get('input[name="surname"]').type('姓');
        cy.get('#form-add-student').submit();
        cy.get('input[name="surname"]').should('have.class', 'is-invalid');
      });
    });

    describe('Ввод символов не принадлежащих русскому алфавиту и не являющихся дефисом не проходит валидацию', () => {
      it('(Фамилия)', () => {
        cy.get('input[name="surname"]').type('(Фамилия)');
        cy.get('#form-add-student').submit();
        cy.get('input[name="surname"]').should('have.class', 'is-invalid');
      });

      it('Фамилия–Фамилия', () => {
        cy.get('input[name="surname"]').type('Фамилия–Фамилия');
        cy.get('#form-add-student').submit();
        cy.get('input[name="surname"]').should('have.class', 'is-invalid');
      });

      it('! Фамилия _', () => {
        cy.get('input[name="surname"]').type('! Фамилия _');
        cy.get('#form-add-student').submit();
        cy.get('input[name="surname"]').should('have.class', 'is-invalid');
      });

      it('-!@#$%^&*', () => {
        cy.get('input[name="surname"]').type('-!@#$%^&*');
        cy.get('#form-add-student').submit();
        cy.get('input[name="surname"]').should('have.class', 'is-invalid');
      });
    });
  });
});
