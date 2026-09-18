import loginPage from '../../pages/LoginPage';
import registerPage from '../../pages/RegisterPage';
import homePage from '../../pages/HomePage';
import shoppingListPage from '../../pages/ShoppingListPage';
import cartPage from '../../pages/CartPage';
import usersService from '../../services/UsersService';
import { buildUserPayload } from '../../fixtures/factories/userFactory';

describe('UI - Shopping', () => {
  let createdUserId;

  afterEach(() => {
    if (createdUserId) {
      usersService.deleteById(createdUserId).then((response) => {
        expect(response.status, 'cleanup status').to.eq(200);
        expect(response.body.message).to.eq('Registro excluído com sucesso');
      });
    }
  });

  it('should register, add a product to the cart flow, and log out', { tags: ['@ui', '@registration', '@cart', '@e2e', '@positive'] }, () => {
    const user = buildUserPayload({ administrador: 'false' });

    cy.intercept('POST', '**/usuarios').as('createUser');

    loginPage.visit();
    loginPage.goToRegistration();
    cy.location('pathname').should('eq', '/cadastrarusuarios');

    registerPage.register(user);

    cy.wait('@createUser').then(({ response }) => {
      createdUserId = response.body._id;
      expect(response.statusCode, 'user creation status').to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      expect(createdUserId, 'created user ID').to.be.a('string').and.not.be.empty;
    });

    cy.location('pathname', { timeout: 10000 }).should('eq', '/home');
    homePage.heading.should('be.visible').and('contain.text', 'Serverest Store');

    homePage.addFirstProductToShoppingList();
    homePage.openShoppingList();

    cy.location('pathname').should('eq', '/minhaListaDeProdutos');
    shoppingListPage.assertSelectedProductIsVisible();
    shoppingListPage.proceedToCart();

    cy.location('pathname').should('eq', '/carrinho');
    cartPage.heading.should('be.visible').and('contain.text', 'Em construção aguarde');
    cartPage.logout();

    cy.location('pathname').should('eq', '/login');
  });
});
