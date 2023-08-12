import { API_BASE_URL } from '../../../src/js/config/path';

describe('Тестирование поля фильтра "ФИО"', () => {
  beforeEach(() => {
    // cy.visit('http://localhost:3000');
    cy.visit('http://localhost:4200/');

    cy.request('GET', `${API_BASE_URL}/api/students`, { timeout: 3000 }).then((response) => {
      expect(response).to.have.property('status', 200);
    });
  });

  describe('Добавляем студентов для тестирования поиска', () => {
    it('Воробьев Роман Сергеевич', () => {
      cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', { timeout: 3000 })
        .should('be.visible')
        .click();
      cy.get('input[name="surname"]').type('Воробьев');
      cy.get('input[name="name"]').type('Роман');
      cy.get('input[name="lastname"]').type('Сергеевич');
      cy.get('input[name="birthday"]').type('1996-10-10');
      cy.get('input[name="studyStart"]').type('2010');
      cy.get('input[name="faculty"]').type('Фундаментальной физико-химической инженерии');
      cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary', { timeout: 3000 })
        .should('be.visible')
        .click();
      cy.request('GET', `${API_BASE_URL}/api/students`).then((response) => {
        expect(response).to.have.property('status', 200);
      });
    });

    it('Воронова Наталья Алексеевна', () => {
      cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', { timeout: 3000 })
        .should('be.visible')
        .click();
      cy.get('input[name="surname"]').type('Воронова');
      cy.get('input[name="name"]').type('Наталья');
      cy.get('input[name="lastname"]').type('Алексеевна');
      cy.get('input[name="birthday"]').type('1994-10-01');
      cy.get('input[name="studyStart"]').type('2011');
      cy.get('input[name="faculty"]').type('Биологический');
      cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary', { timeout: 3000 })
        .should('be.visible')
        .click();
      cy.request('GET', `${API_BASE_URL}/api/students`).then((response) => {
        expect(response).to.have.property('status', 200);
      });
    });

    it('Воропаев Максим Владимирович', () => {
      cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', { timeout: 3000 })
        .should('be.visible')
        .click();
      cy.get('input[name="surname"]').type('Воропаев');
      cy.get('input[name="name"]').type('Максим');
      cy.get('input[name="lastname"]').type('Владимирович');
      cy.get('input[name="birthday"]').type('1995-03-28');
      cy.get('input[name="studyStart"]').type('2011');
      cy.get('input[name="faculty"]').type('Биологический');
      cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary', { timeout: 3000 })
        .should('be.visible')
        .click();
      cy.request('GET', `${API_BASE_URL}/api/students`).then((response) => {
        expect(response).to.have.property('status', 200);
      });
    });

    it('Королев Александр Игоревич', () => {
      cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', { timeout: 3000 })
        .should('be.visible')
        .click();
      cy.get('input[name="surname"]').type('Королев');
      cy.get('input[name="name"]').type('Александр');
      cy.get('input[name="lastname"]').type('Игоревич');
      cy.get('input[name="birthday"]').type('1995-08-22');
      cy.get('input[name="studyStart"]').type('2012');
      cy.get('input[name="faculty"]').type('Геологический');
      cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary', { timeout: 3000 })
        .should('be.visible')
        .click();
      cy.request('GET', `${API_BASE_URL}/api/students`).then((response) => {
        expect(response).to.have.property('status', 200);
      });
    });
  });

  describe('Тестирование фильтров', () => {
    it('Тестируем фильтр "ФИО"', () => {
      cy.get('input[name="search-FIO"]').type('Вор');
      cy.get('tr').contains('Воробьев').should('not.have.class', 'hide').and('exist');
      cy.get('tr').contains('Воронова').should('not.have.class', 'hide').and('exist');
      cy.get('tr').contains('Воропаев').should('not.have.class', 'hide').and('exist');
    });

    it('Тестируем фильтр "ФИО" и фильтр "Факультет"', () => {
      cy.get('input[name="search-FIO"]').type('оро');
      cy.get('input[name="search-faculty"]').type('ологический');
      cy.get('tr').contains('Воронова').should('not.have.class', 'hide').and('exist');
      cy.get('tr').contains('Воропаев').should('not.have.class', 'hide').and('exist');
      cy.get('tr').contains('Королев').should('not.have.class', 'hide').and('exist');
    });

    // eslint-disable-next-line max-len
    it('Тестируем совместную работу фильтров "ФИО", "Факультет" и "Год начала обучения"', () => {
      cy.get('input[name="search-FIO"]').type('оро');
      cy.get('input[name="search-faculty"]').type('ологический');
      cy.get('input[name="search-study-start"]').type('2011');
      cy.get('tr').contains('Воронова').should('not.have.class', 'hide').and('exist');
      cy.get('tr').contains('Воропаев').should('not.have.class', 'hide').and('exist');
    });

    // eslint-disable-next-line max-len
    it('Тестируем общую работу фильтров', () => {
      cy.get('input[name="search-FIO"]').type('оро');
      cy.get('input[name="search-faculty"]').type('ологический');
      cy.get('input[name="search-year-graduation"]').type('2015');
      cy.get('tr').contains('Воронова').should('not.have.class', 'hide').and('exist');
      cy.get('tr').contains('Воропаев').should('not.have.class', 'hide').and('exist');
    });
  });

  describe('Удаляем студентов после тестирования', () => {
    it('Воробьев Роман Сергеевич', () => {
      cy.get('#list-student').should('be.visible').contains('Воробьев Роман Сергеевич');
      cy.get('td').contains('Воробьев Роман Сергеевич').should('be.visible').click();
      cy.get('button#delete-student-btn.control__student-btn.control__student-btn--delete.btn.btn-danger', {
        timeout: 3000,
      })
        .should('be.visible')
        .click();
      cy.get('button#delete-student-btn-from-base.delete-info__btn.btn.btn-danger').should('be.visible').click();
      cy.request('GET', `${API_BASE_URL}/api/students`, { timeout: 3000 }).then((response) => {
        expect(response).to.have.property('status', 200);
      });
    });

    it('Воронова Наталья Алексеевна', () => {
      cy.get('#list-student').should('be.visible').contains('Воронова Наталья Алексеевна');
      cy.get('td').contains('Воронова Наталья Алексеевна').should('be.visible').click();
      cy.get('button#delete-student-btn.control__student-btn.control__student-btn--delete.btn.btn-danger', {
        timeout: 3000,
      })
        .should('be.visible')
        .click();
      cy.get('button#delete-student-btn-from-base.delete-info__btn.btn.btn-danger').should('be.visible').click();
      cy.request('GET', `${API_BASE_URL}/api/students`, { timeout: 3000 }).then((response) => {
        expect(response).to.have.property('status', 200);
      });
    });

    it('Воропаев Максим Владимирович', () => {
      cy.get('#list-student').should('be.visible').contains('Воропаев Максим Владимирович');
      cy.get('td').contains('Воропаев Максим Владимирович').should('be.visible').click();
      cy.get('button#delete-student-btn.control__student-btn.control__student-btn--delete.btn.btn-danger', {
        timeout: 3000,
      })
        .should('be.visible')
        .click();
      cy.get('button#delete-student-btn-from-base.delete-info__btn.btn.btn-danger').should('be.visible').click();
      cy.request('GET', `${API_BASE_URL}/api/students`, { timeout: 3000 }).then((response) => {
        expect(response).to.have.property('status', 200);
      });
    });

    it('Королев Александр Игоревич', () => {
      cy.get('#list-student').should('be.visible').contains('Королев Александр Игоревич');
      cy.get('td').contains('Королев Александр Игоревич').should('be.visible').click();
      cy.get('button#delete-student-btn.control__student-btn.control__student-btn--delete.btn.btn-danger', {
        timeout: 3000,
      })
        .should('be.visible')
        .click();
      cy.get('button#delete-student-btn-from-base.delete-info__btn.btn.btn-danger').should('be.visible').click();
      cy.request('GET', `${API_BASE_URL}/api/students`, { timeout: 3000 }).then((response) => {
        expect(response).to.have.property('status', 200);
      });
    });
  });
});
