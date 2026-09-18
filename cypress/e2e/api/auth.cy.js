import authService from '../../services/AuthService';
import usersService from '../../services/UsersService';
import { buildUserPayload } from '../../fixtures/factories/userFactory';

describe('API - Authentication', () => {
  let createdUserId;

  beforeEach(() => {
    createdUserId = undefined;
  });

  afterEach(() => {
    if (createdUserId) {
      usersService.deleteById(createdUserId).then((response) => {
        expect(response.status, 'cleanup status').to.eq(200);
        expect(response.body.message, 'cleanup confirmation')
          .to.eq('Registro excluído com sucesso');
      });
    }
  });

  it('should log in successfully and return an authorization token', { tags: ['@api', '@auth', '@positive'] }, () => {
    const user = buildUserPayload({ administrador: 'true' });

    usersService.create(user).then((response) => {
      // Capture the ID before assertions to allow cleanup after a test failure.
      createdUserId = response.body._id;
      expect(response.status, 'user creation status').to.eq(201);
      expect(createdUserId, 'created user ID').to.be.a('string').and.not.be.empty;

      return authService.login(user);
    }).then((loginResponse) => {
      expect(loginResponse.status, 'login status').to.eq(200);
      expect(loginResponse.body.message).to.eq('Login realizado com sucesso');
      expect(loginResponse.body.authorization).to.be.a('string').and.match(/^Bearer\s+\S+$/);
    });
  });
});
