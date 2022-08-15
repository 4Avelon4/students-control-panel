describe('Тестирование формы', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Пустые данные не вносятся', () => {
    cy.get('#form-add-student').submit();
    cy.get('input[name="surname"]').should('have.class', 'is-invalid');
    cy.get('input[name="name"]').should('have.class', 'is-invalid');
    cy.get('input[name="lastname"]').should('have.class', 'is-invalid');
    cy.get('input[name="birthDate"]').should('have.class', 'is-invalid');
    cy.get('input[name="yearStudy"]').should('have.class', 'is-invalid');
    cy.get('input[name="faculty"]').should('have.class', 'is-invalid');
  });

  it('Некорретные данные не вносятся', () => {
    cy.get('input[name="surname"]').type('ворьбьев');
    cy.get('input[name="name"]').type('Roman');
    cy.get('input[name="lastname"]').type('Sергеевич');
    cy.get('input[name="birthDate"]').type('1899-10-10');
    cy.get('input[name="yearStudy"]').type('2025');
    cy.get('input[name="faculty"]').type('Филологический 1');
    cy.get('#form-add-student').submit();
    cy.get('input[name="surname"]').should('have.class', 'is-invalid');
    cy.get('input[name="name"]').should('have.class', 'is-invalid');
    cy.get('input[name="lastname"]').should('have.class', 'is-invalid');
    cy.get('input[name="birthDate"]').should('have.class', 'is-invalid');
    cy.get('input[name="yearStudy"]').should('have.class', 'is-invalid');
    cy.get('input[name="faculty"]').should('have.class', 'is-invalid');
    cy.get('tbody').contains('Ворьбьев').should('not.exist');
  });

  it('Корретные данные успешно вносятся', () => {
    cy.get('input[name="surname"]').type('Ворьбьев');
    cy.get('input[name="name"]').type('Роман');
    cy.get('input[name="lastname"]').type('Сергеевич');
    cy.get('input[name="birthDate"]').type('1996-10-10');
    cy.get('input[name="yearStudy"]').type('2010');
    cy.get('input[name="faculty"]').type('Факультет фундаментальной физико-химической инженерии');
    cy.get('#form-add-student').submit();
    cy.get('input[name="surname"]').should('not.have.class', 'is-invalid');
    cy.get('input[name="name"]').should('not.have.class', 'is-invalid');
    cy.get('input[name="lastname"]').should('not.have.class', 'is-invalid');
    cy.get('input[name="birthDate"]').should('not.have.class', 'is-invalid');
    cy.get('input[name="yearStudy"]').should('not.have.class', 'is-invalid');
    cy.get('input[name="faculty"]').should('not.have.class', 'is-invalid');
    cy.get('tbody').contains('Ворьбьев');
  });
});
