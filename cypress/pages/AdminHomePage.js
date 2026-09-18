class AdminHomePage {
  get welcomeHeading() {
    return cy.get('h1');
  }

  get logoutButton() {
    return cy.get('[data-testid="logout"]');
  }
}

export default new AdminHomePage();
