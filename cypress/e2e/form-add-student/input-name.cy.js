describe('Тестирование поля ввода "Имя"', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  describe('Тестирование ввода корректных значений', () => {
    describe('Ввод корректных значений', () => {
      it('Имя', () => {
        cy.get('input[name="name"]').type('Имя');
        cy.get('#form-add-student').submit();
        cy.get('input[name="name"]').should('not.have.class', 'is-invalid');
      });

      it('Имя-Имя', () => {
        cy.get('input[name="name"]').type('Имя-Имя');
        cy.get('#form-add-student').submit();
        cy.get('input[name="name"]').should('not.have.class', 'is-invalid');
      });
    });
  });

  describe('Тестирование ввода некорректных значений', () => {
    it('Пустые данные не проходят валидацию', () => {
      cy.get('#form-add-student').submit();
      cy.get('input[name="name"]').should('have.class', 'is-invalid');
    });

    describe('Ввод слова с маленькой бувы не проходит валидацию', () => {
      it('имя', () => {
        cy.get('input[name="name"]').type('имя');
        cy.get('#form-add-student').submit();
        cy.get('input[name="name"]').should('have.class', 'is-invalid');
      });
    });

    describe('Ввод цифр не проходит валидацию', () => {
      it('Имя111', () => {
        cy.get('input[name="name"]').type('Имя111');
        cy.get('#form-add-student').submit();
        cy.get('input[name="name"]').should('have.class', 'is-invalid');
      });

      it('1111', () => {
        cy.get('input[name="name"]').type('1111');
        cy.get('#form-add-student').submit();
        cy.get('input[name="name"]').should('have.class', 'is-invalid');
      });

      it('111Имя', () => {
        cy.get('input[name="name"]').type('111Имя');
        cy.get('#form-add-student').submit();
        cy.get('input[name="name"]').should('have.class', 'is-invalid');
      });

      it('111Имя 00', () => {
        cy.get('input[name="name"]').type('111Имя 00');
        cy.get('#form-add-student').submit();
        cy.get('input[name="name"]').should('have.class', 'is-invalid');
      });
    });

    describe('Ввод букв не принадлежащих русскому алфавиту не проходит валидацию', () => {
      it('Name', () => {
        cy.get('input[name="name"]').type('Name');
        cy.get('#form-add-student').submit();
        cy.get('input[name="name"]').should('have.class', 'is-invalid');
      });

      it('名前', () => {
        cy.get('input[name="name"]').type('名前');
        cy.get('#form-add-student').submit();
        cy.get('input[name="name"]').should('have.class', 'is-invalid');
      });
    });

    describe('Ввод символов не принадлежащих русскому алфавиту и не являющихся дефисом не проходит валидацию', () => {
      it('(Имя)', () => {
        cy.get('input[name="name"]').type('(Имя)');
        cy.get('#form-add-student').submit();
        cy.get('input[name="name"]').should('have.class', 'is-invalid');
      });

      it('Имя–Имя', () => {
        cy.get('input[name="name"]').type('Имя–Имя');
        cy.get('#form-add-student').submit();
        cy.get('input[name="name"]').should('have.class', 'is-invalid');
      });

      it('! Имя _', () => {
        cy.get('input[name="name"]').type('! Имя _');
        cy.get('#form-add-student').submit();
        cy.get('input[name="name"]').should('have.class', 'is-invalid');
      });

      it('-!@#$%^&*', () => {
        cy.get('input[name="name"]').type('-!@#$%^&*');
        cy.get('#form-add-student').submit();
        cy.get('input[name="name"]').should('have.class', 'is-invalid');
      });
    });
  });
});
