class HeaderComponent {
  get logoutButton() {
    return cy.get('[data-testid="logout"]');
  }

  logout() {
    return this.logoutButton.should('be.visible').and('be.enabled').click();
  }
}

export default HeaderComponent;
