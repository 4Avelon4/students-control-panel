describe('Тестирование поля ввода "Факультет"', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  describe('Тестирование ввода корректных значений', () => {
    describe('Ввод корректных значений', () => {
      it('Фундаментальной физико-химической инженерии', () => {
        cy.get('input[name="faculty"]').type('Фундаментальной физико-химической инженерии');
        cy.get('#form-add-student').submit();
        cy.get('input[name="faculty"]').should('not.have.class', 'is-invalid');
      });

      it('Механико-математический', () => {
        cy.get('input[name="faculty"]').type('Механико-математический');
        cy.get('#form-add-student').submit();
        cy.get('input[name="faculty"]').should('not.have.class', 'is-invalid');
      });
    });
  });

  describe('Тестирование ввода некорректных значений', () => {
    it('Пустые данные не проходят валидацию', () => {
      cy.get('#form-add-student').submit();
      cy.get('input[name="faculty"]').should('have.class', 'is-invalid');
    });

    describe('Ввод слова с маленькой бувы не проходит валидацию', () => {
      it('филологический', () => {
        cy.get('input[name="faculty"]').type('филологический');
        cy.get('#form-add-student').submit();
        cy.get('input[name="faculty"]').should('have.class', 'is-invalid');
      });
    });

    describe('Ввод цифр не проходит валидацию', () => {
      it('Филологический111', () => {
        cy.get('input[name="faculty"]').type('Филологический111');
        cy.get('#form-add-student').submit();
        cy.get('input[name="faculty"]').should('have.class', 'is-invalid');
      });

      it('Фундаментальной физико-химическ111й инженерии', () => {
        cy.get('input[name="faculty"]').type('Фундаментальной физико-химическ111й инженерии');
        cy.get('#form-add-student').submit();
        cy.get('input[name="faculty"]').should('have.class', 'is-invalid');
      });

      it('1111', () => {
        cy.get('input[name="faculty"]').type('1111');
        cy.get('#form-add-student').submit();
        cy.get('input[name="faculty"]').should('have.class', 'is-invalid');
      });

      it('111Филологический', () => {
        cy.get('input[name="faculty"]').type('111Филологический');
        cy.get('#form-add-student').submit();
        cy.get('input[name="faculty"]').should('have.class', 'is-invalid');
      });

      it('111Филологический 00', () => {
        cy.get('input[name="faculty"]').type('111Филологический 00');
        cy.get('#form-add-student').submit();
        cy.get('input[name="faculty"]').should('have.class', 'is-invalid');
      });
    });

    describe('Ввод букв не принадлежащих русскому алфавиту не проходит валидацию', () => {
      it('Philological', () => {
        cy.get('input[name="faculty"]').type('Philological');
        cy.get('#form-add-student').submit();
        cy.get('input[name="faculty"]').should('have.class', 'is-invalid');
      });

      it('文献学', () => {
        cy.get('input[name="faculty"]').type('文献学');
        cy.get('#form-add-student').submit();
        cy.get('input[name="faculty"]').should('have.class', 'is-invalid');
      });
    });

    // eslint-disable-next-line max-len
    describe('Ввод символов не принадлежащих русскому алфавиту и не являющихся дефисом или пробелом не проходит валидацию', () => {
      it('(Филологический)', () => {
        cy.get('input[name="faculty"]').type('(Филологический)');
        cy.get('#form-add-student').submit();
        cy.get('input[name="faculty"]').should('have.class', 'is-invalid');
      });

      it('Механико–математический', () => {
        cy.get('input[name="faculty"]').type('Механико–математический');
        cy.get('#form-add-student').submit();
        cy.get('input[name="faculty"]').should('have.class', 'is-invalid');
      });

      it('! Филологический _', () => {
        cy.get('input[name="faculty"]').type('! Филологический _');
        cy.get('#form-add-student').submit();
        cy.get('input[name="faculty"]').should('have.class', 'is-invalid');
      });

      it('-!@#$%^&*', () => {
        cy.get('input[name="faculty"]').type('-!@#$%^&*');
        cy.get('#form-add-student').submit();
        cy.get('input[name="faculty"]').should('have.class', 'is-invalid');
      });
    });
  });
});
