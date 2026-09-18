import HeaderComponent from './components/HeaderComponent';

class CartPage extends HeaderComponent {
  get heading() {
    return cy.get('h1');
  }
}

export default new CartPage();
