class UsersService {
  create(user) {
    return cy.env(['apiUrl']).then(({ apiUrl }) => {
      return cy.request({
        method: 'POST',
        url: `${apiUrl.replace(/\/$/, '')}/usuarios`,
        body: user,
        failOnStatusCode: false,
      });
    });
  }

  deleteById(userId) {
    return cy.env(['apiUrl']).then(({ apiUrl }) => {
      return cy.request({
        method: 'DELETE',
        url: `${apiUrl.replace(/\/$/, '')}/usuarios/${encodeURIComponent(userId)}`,
        failOnStatusCode: false,
      });
    });
  }
}

export default new UsersService();
