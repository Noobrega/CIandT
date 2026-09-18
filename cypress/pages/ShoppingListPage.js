import HeaderComponent from './components/HeaderComponent';

class ShoppingListPage extends HeaderComponent {
  get checkoutButton() {
    return cy.get('[data-testid="adicionar carrinho"]');
  }

  assertSelectedProductIsVisible() {
    return cy.get('@selectedProductName').then((productName) => {
      cy.contains(String(productName)).should('be.visible');
    });
  }

  proceedToCart() {
    return this.checkoutButton.should('be.visible').and('be.enabled').click();
  }
}

export default new ShoppingListPage();
