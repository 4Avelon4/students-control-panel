describe('Тестирование поля фильтра "ФИО"', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');

    // Вносим массив студентов для тестирования поиска
    cy.get('input[name="surname"]').type('Воробьев');
    cy.get('input[name="name"]').type('Роман');
    cy.get('input[name="lastname"]').type('Сергеевич');
    cy.get('input[name="birthDate"]').type('1996-10-10');
    cy.get('input[name="yearStudy"]').type('2010');
    cy.get('input[name="faculty"]').type('Фундаментальной физико-химической инженерии');
    cy.get('#form-add-student').submit();

    cy.get('input[name="surname"]').type('Воронова');
    cy.get('input[name="name"]').type('Наталья');
    cy.get('input[name="lastname"]').type('Алексеевна');
    cy.get('input[name="birthDate"]').type('1994-10-01');
    cy.get('input[name="yearStudy"]').type('2011');
    cy.get('input[name="faculty"]').type('Биологический');
    cy.get('#form-add-student').submit();

    cy.get('input[name="surname"]').type('Воропаев');
    cy.get('input[name="name"]').type('Максим');
    cy.get('input[name="lastname"]').type('Владимирович');
    cy.get('input[name="birthDate"]').type('1995-03-28');
    cy.get('input[name="yearStudy"]').type('2011');
    cy.get('input[name="faculty"]').type('Филологический');
    cy.get('#form-add-student').submit();

    cy.get('input[name="surname"]').type('Королев');
    cy.get('input[name="name"]').type('Александр');
    cy.get('input[name="lastname"]').type('Игоревич');
    cy.get('input[name="birthDate"]').type('1995-08-22');
    cy.get('input[name="yearStudy"]').type('2012');
    cy.get('input[name="faculty"]').type('Геологический');
    cy.get('#form-add-student').submit();
  });

  describe('Тестирование поиска фамилии', () => {
    describe('Ввод корректных значений', () => {
      it('Добавляем в фильтр "ФИО" значение "Вор"', () => {
        cy.get('input[name="search-FIO"]').type('Вор');
        cy.get('tr').contains('Воробьев').should('not.have.class', 'hide').and('exist');
        cy.get('tr').contains('Воронова').should('not.have.class', 'hide').and('exist');
        cy.get('tr').contains('Воропаев').should('not.have.class', 'hide').and('exist');
      });

      it('Добавляем в фильтр "ФИО" значение "оро", в фильтр "Факультет" значение "ологический"', () => {
        cy.get('input[name="search-FIO"]').type('оро');
        cy.get('input[name="search-faculty"]').type('ологический');
        cy.get('tr').contains('Воронова').should('not.have.class', 'hide').and('exist');
        cy.get('tr').contains('Воропаев').should('not.have.class', 'hide').and('exist');
        cy.get('tr').contains('Королев').should('not.have.class', 'hide').and('exist');
      });

      // eslint-disable-next-line max-len
      it('Добавляем в фильтр "ФИО" значение "оро", в фильтр "Факультет" значение "Био", в фильтр "Год начала обучения" значение "2011"', () => {
        cy.get('input[name="search-FIO"]').type('оро');
        cy.get('input[name="search-faculty"]').type('ологический');
        cy.get('input[name="search-year-starting"]').type('2011');
        cy.get('tr').contains('Воронова').should('not.have.class', 'hide').and('exist');
        cy.get('tr').contains('Воропаев').should('not.have.class', 'hide').and('exist');
      });

      // eslint-disable-next-line max-len
      it('Добавляем в фильтр "ФИО" значение "оро", в фильтр "Факультет" значение "Био", в фильтр "Год окончания обучения" значение "2015', () => {
        cy.get('input[name="search-FIO"]').type('оро');
        cy.get('input[name="search-faculty"]').type('ологический');
        cy.get('input[name="search-year-graduation"]').type('2015');
        cy.get('tr').contains('Воронова').should('not.have.class', 'hide').and('exist');
        cy.get('tr').contains('Воропаев').should('not.have.class', 'hide').and('exist');
      });
    });
  });
});
