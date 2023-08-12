import { API_BASE_URL } from '../../../src/js/config/path';

describe('Тестирование формы изменения студента', () => {
  beforeEach(() => {
    // cy.visit('http://localhost:3000');
    cy.visit('http://localhost:4200/');

    cy.request('GET', `${API_BASE_URL}/api/students`, { timeout: 3000 }).then((response) => {
      expect(response).to.have.property('status', 200);
    });
  });

  it('Добавляем студента для последующего изменения', () => {
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

  it('Меняем фамилию студента', () => {
    cy.get('#list-student').should('be.visible').contains('Воронова Наталья Алексеевна');
    cy.get('td').contains('Воронова Наталья Алексеевна').should('be.visible').click();
    cy.get('button#change-student-btn.control__student-btn.control__student-btn--change.btn.btn-primary', {
      timeout: 3000,
    })
      .should('be.visible')
      .click();
    cy.get('input[name="surname"]').clear().type('Неворонова');
    cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary').click();
    cy.request('GET', `${API_BASE_URL}/api/students`, { timeout: 3000 }).then((response) => {
      expect(response).to.have.property('status', 200);
    });
  });

  it('Проверяем изменения', () => {
    cy.get('#list-student').should('be.visible').contains('Неворонова Наталья Алексеевна');
  });
});
