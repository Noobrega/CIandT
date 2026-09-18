# ServeRest Test Automation

## Requirements

- Node.js 24.x and npm
- Internet access to install Cypress and access ServeRest

## Installation

From the project directory, run:

```bash
npm ci
npm run cy:verify
```

`npm ci` installs the locked dependencies and downloads the Cypress binary. `cy:verify` checks that the binary can start.

## Running Tests

```bash
# Open the interactive Cypress app
npm run cy:open

# Run all tests in headless mode with Electron
npm test

# Run frontend tests only
npm run test:frontend

# Run API tests only
npm run test:api
```

Test scenarios have not been added yet. Until `.cy.js` files are created in `cypress/e2e/frontend` or `cypress/e2e/api`, headless runs will exit with a "no spec files were found" error.

## Configuration

`cypress.config.js` defines the frontend URL (`e2e.baseUrl`) and API URL (`env.apiUrl`). API-only runs use `cypress.api.config.js`, which disables the frontend availability check.

To override the target URLs:

```bash
npm run test:frontend -- --config baseUrl=https://front.serverest.dev
npm run test:api -- --env apiUrl=https://serverest.dev
```

Tests run with isolation enabled and automatic retries disabled. Failure screenshots are saved to `cypress/screenshots` during headless runs and are excluded from Git. Video recording is disabled.

## Troubleshooting

If Cypress fails to start with `bad option: --smoke-test`, check whether your terminal has `ELECTRON_RUN_AS_NODE=1` set. In PowerShell, remove it from the current session and retry:

```powershell
Remove-Item Env:ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue
npm run cy:verify
```
