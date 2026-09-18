class RegisterPage {
  register({ nome, email, password, administrador }) {
    cy.get('[data-testid="nome"]').should('be.visible').clear().type(nome);
    cy.get('[data-testid="email"]').clear().type(email);
    cy.get('[data-testid="password"]').clear().type(password, { log: false });

    if (administrador === 'true') {
      cy.get('[data-testid="checkbox"]').check();
    }

    return cy.get('[data-testid="cadastrar"]').click();
  }
}

export default new RegisterPage();
