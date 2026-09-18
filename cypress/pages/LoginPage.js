class LoginPage {
  get errorAlert() {
    return cy.get('[role="alert"]');
  }

  visit() {
    return cy.visit('/login');
  }

  goToRegistration() {
    return cy.get('[data-testid="cadastrar"]').click();
  }

  login({ email, password }) {
    cy.get('[data-testid="email"]').should('be.visible').clear().type(email);
    cy.get('[data-testid="senha"]').clear().type(password, { log: false });
    return cy.get('[data-testid="entrar"]').click();
  }
}

export default new LoginPage();
