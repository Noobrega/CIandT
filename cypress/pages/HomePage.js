import HeaderComponent from './components/HeaderComponent';

class HomePage extends HeaderComponent {
  get heading() {
    return cy.get('h1');
  }

  addFirstProductToShoppingList() {
    cy.get('.card-title').first().invoke('text').then((productName) => {
      cy.wrap(productName.trim()).as('selectedProductName');
    });

    return cy.get('[data-testid="adicionarNaLista"]').first().click();
  }

  openShoppingList() {
    return cy.get('[data-testid="lista-de-compras"]').click();
  }
}

export default new HomePage();
