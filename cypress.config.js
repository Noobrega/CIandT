const { defineConfig } = require('cypress');
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');
const fs = require('node:fs');
const path = require('node:path');

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'reports',
    reportFilename: 'test-report',
    reportPageTitle: 'Test Report',
    charts: true,
    inlineAssets: true,
    embeddedScreenshots: false,
    ignoreVideos: true,
    saveJson: true,
    saveAllAttempts: false,
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
      on('before:run', async (details) => {
        const reportsPath = path.resolve(config.projectRoot, 'reports');
        const relativePath = path.relative(config.projectRoot, reportsPath);

        if (relativePath !== 'reports') {
          throw new Error('Report cleanup must stay inside the project reports directory.');
        }

        // Clean once per run to preserve reports from all specs in the suite.
        fs.rmSync(reportsPath, { recursive: true, force: true });
        await beforeRunHook(details);
      });

      on('after:run', async (results) => {
        await afterRunHook(results);
      });
    },
  },
});
