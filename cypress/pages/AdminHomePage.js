import HeaderComponent from './components/HeaderComponent';

class AdminHomePage extends HeaderComponent {
  get welcomeHeading() {
    return cy.get('h1');
  }
}

export default new AdminHomePage();
