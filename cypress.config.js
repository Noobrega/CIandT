const { defineConfig } = require('cypress');
const fs = require('node:fs');
const path = require('node:path');

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'reports',
    reportFilename: '[name]-report',
    overwrite: true,
    html: true,
    json: true,
    inlineAssets: true,
  },
  video: true,
  screenshotOnRunFailure: true,
  retries: 0,
  env: {
    apiUrl: 'https://serverest.dev',
  },
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    testIsolation: true,
    setupNodeEvents(on, config) {
      on('before:run', () => {
        const reportsPath = path.resolve(config.projectRoot, 'reports');
        const relativePath = path.relative(config.projectRoot, reportsPath);

        if (relativePath !== 'reports') {
          throw new Error('Report cleanup must stay inside the project reports directory.');
        }

        // Clean once per run to preserve reports from all specs in the suite.
        fs.rmSync(reportsPath, { recursive: true, force: true });
      });
    },
  },
});
