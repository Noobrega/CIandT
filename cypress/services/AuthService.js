class AuthService {
  login({ email, password }) {
    return cy.env(['apiUrl']).then(({ apiUrl }) => {
      return cy.request({
        method: 'POST',
        url: `${apiUrl.replace(/\/$/, '')}/login`,
        body: { email, password },
        failOnStatusCode: false,
      });
    });
  }
}

export default new AuthService();
