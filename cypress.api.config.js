const { defineConfig } = require('cypress');
const config = require('./cypress.config');

module.exports = defineConfig({
  ...config,
  e2e: {
    ...config.e2e,
    // API tests should not depend on frontend availability.
    baseUrl: null,
    specPattern: 'cypress/e2e/api/**/*.cy.js',
  },
});
