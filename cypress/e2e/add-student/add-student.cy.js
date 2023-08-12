import { API_BASE_URL } from '../../../src/js/config/path';

describe('Тестирование формы добавления студента', () => {
  beforeEach(() => {
    // cy.visit('http://localhost:5500');
    cy.visit('http://localhost:4200/');

    cy.request('GET', `${API_BASE_URL}/api/students`, { timeout: 3000 }).then((response) => {
      expect(response).to.have.property('status', 200);
    });
  });

  it('Добавляем студента в таблицу', () => {
    cy.get('button#add-student-btn.control__student-btn.control__student-btn--add.btn.btn-primary', { timeout: 3000 })
      .should('be.visible')
      .click();
    cy.get('input[name="surname"]').type('Воробьев');
    cy.get('input[name="name"]').type('Роман');
    cy.get('input[name="lastname"]').type('Сергеевич');
    cy.get('input[name="birthday"]').type('1996-10-10');
    cy.get('input[name="studyStart"]').type('2010');
    cy.get('input[name="faculty"]').type('Факультет фундаментальной физико-химической инженерии');
    cy.get('button#form-submit-button.form-add-student__btn.btn.btn-primary', { timeout: 3000 })
      .should('be.visible')
      .click();
    cy.get('input[name="surname"]').should('not.have.class', 'is-invalid');
    cy.get('input[name="name"]').should('not.have.class', 'is-invalid');
    cy.get('input[name="lastname"]').should('not.have.class', 'is-invalid');
    cy.get('input[name="birthday"]').should('not.have.class', 'is-invalid');
    cy.get('input[name="studyStart"]').should('not.have.class', 'is-invalid');
    cy.get('input[name="faculty"]').should('not.have.class', 'is-invalid');
    cy.request('GET', `${API_BASE_URL}/api/students`).then((response) => {
      expect(response).to.have.property('status', 200);
    });
  });

  it('Проверяем что студент добавился в таблицу', () => {
    cy.get('#list-student').should('be.visible').contains('Воробьев Роман Сергеевич');
  });
});
