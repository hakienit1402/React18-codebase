describe('Smoke', () => {
  it('loads home', () => {
    cy.visit('http://localhost:5173');
    cy.contains('Home').should('exist');
  });
});

