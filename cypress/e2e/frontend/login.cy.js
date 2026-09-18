import loginPage from '../../pages/LoginPage';
import adminHomePage from '../../pages/AdminHomePage';
import usersService from '../../services/UsersService';
import { buildUserPayload } from '../../fixtures/factories/userFactory';

describe('UI - Authentication', () => {
  let user;
  let createdUserId;

  beforeEach(() => {
    createdUserId = undefined;
    user = buildUserPayload({ administrador: 'true' });

    usersService.create(user).then((response) => {
      // Preserve the ID so teardown can run even if a setup assertion fails.
      createdUserId = response.body._id;
      expect(response.status, 'user creation status').to.eq(201);
      expect(createdUserId, 'created user ID').to.be.a('string').and.not.be.empty;
    });
  });

  afterEach(() => {
    if (createdUserId) {
      usersService.deleteById(createdUserId).then((response) => {
        expect(response.status, 'cleanup status').to.eq(200);
        expect(response.body.message).to.eq('Registro excluído com sucesso');
      });
    }
  });

  it('should log in with valid credentials and display the admin home page', { tags: ['@ui', '@auth', '@positive'] }, () => {
    loginPage.visit();
    loginPage.login(user);

    cy.location('pathname').should('eq', '/admin/home');
    adminHomePage.welcomeHeading.should('be.visible').and('contain.text', `Bem Vindo  ${user.nome}`);
    adminHomePage.logoutButton.should('be.visible').and('be.enabled');
  });
});
