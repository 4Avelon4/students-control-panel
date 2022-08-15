describe('Тестирование поля ввода "Отчество"', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  describe('Тестирование ввода корректных значений', () => {
    describe('Ввод корректных значений', () => {
      it('Отчество', () => {
        cy.get('input[name="lastname"]').type('Отчество');
        cy.get('#form-add-student').submit();
        cy.get('input[name="lastname"]').should('not.have.class', 'is-invalid');
      });

      it('Отчество-Отчество', () => {
        cy.get('input[name="lastname"]').type('Отчество-Отчество');
        cy.get('#form-add-student').submit();
        cy.get('input[name="lastname"]').should('not.have.class', 'is-invalid');
      });
    });
  });

  describe('Тестирование ввода некорректных значений', () => {
    it('Пустые данные не проходят валидацию', () => {
      cy.get('#form-add-student').submit();
      cy.get('input[name="lastname"]').should('have.class', 'is-invalid');
    });

    describe('Ввод слова с маленькой бувы не проходит валидацию', () => {
      it('отчество', () => {
        cy.get('input[name="lastname"]').type('отчество');
        cy.get('#form-add-student').submit();
        cy.get('input[name="lastname"]').should('have.class', 'is-invalid');
      });
    });

    describe('Ввод цифр не проходит валидацию', () => {
      it('Отчество111', () => {
        cy.get('input[name="lastname"]').type('Отчество111');
        cy.get('#form-add-student').submit();
        cy.get('input[name="lastname"]').should('have.class', 'is-invalid');
      });

      it('1111', () => {
        cy.get('input[name="lastname"]').type('1111');
        cy.get('#form-add-student').submit();
        cy.get('input[name="lastname"]').should('have.class', 'is-invalid');
      });

      it('111Отчество', () => {
        cy.get('input[name="lastname"]').type('111Отчество');
        cy.get('#form-add-student').submit();
        cy.get('input[name="lastname"]').should('have.class', 'is-invalid');
      });

      it('111Отчество 00', () => {
        cy.get('input[name="lastname"]').type('111Отчество 00');
        cy.get('#form-add-student').submit();
        cy.get('input[name="lastname"]').should('have.class', 'is-invalid');
      });
    });

    describe('Ввод букв не принадлежащих русскому алфавиту не проходит валидацию', () => {
      it('Lastname', () => {
        cy.get('input[name="lastname"]').type('Lastname');
        cy.get('#form-add-student').submit();
        cy.get('input[name="lastname"]').should('have.class', 'is-invalid');
      });

      it('ミドルネーム', () => {
        cy.get('input[name="lastname"]').type('ミドルネーム');
        cy.get('#form-add-student').submit();
        cy.get('input[name="lastname"]').should('have.class', 'is-invalid');
      });
    });

    describe('Ввод символов не принадлежащих русскому алфавиту и не являющихся дефисом не проходит валидацию', () => {
      it('(Отчество)', () => {
        cy.get('input[name="lastname"]').type('(Отчество)');
        cy.get('#form-add-student').submit();
        cy.get('input[name="lastname"]').should('have.class', 'is-invalid');
      });

      it('Отчество–Отчество', () => {
        cy.get('input[name="lastname"]').type('Отчество–Отчество');
        cy.get('#form-add-student').submit();
        cy.get('input[name="lastname"]').should('have.class', 'is-invalid');
      });

      it('! Отчество _', () => {
        cy.get('input[name="lastname"]').type('! Отчество _');
        cy.get('#form-add-student').submit();
        cy.get('input[name="lastname"]').should('have.class', 'is-invalid');
      });

      it('-!@#$%^&*', () => {
        cy.get('input[name="lastname"]').type('-!@#$%^&*');
        cy.get('#form-add-student').submit();
        cy.get('input[name="lastname"]').should('have.class', 'is-invalid');
      });
    });
  });
});
