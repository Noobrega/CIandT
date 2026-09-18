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

The API suite covers successful login, rejection of an incorrect password, and validation of a missing password. Each test creates its own user with a unique email and deletes that user afterward. The frontend suite covers administrator login through the UI, using an independent user created and removed through the API.

## Configuration

`cypress.config.js` defines the frontend URL (`e2e.baseUrl`) and API URL (`env.apiUrl`). API-only runs use `cypress.api.config.js`, which disables the frontend availability check.

To override the target URLs:

```bash
npm run test:frontend -- --config baseUrl=https://front.serverest.dev
npm run test:api -- --env apiUrl=https://serverest.dev
```

Tests run with isolation enabled and automatic retries disabled. Failure screenshots are saved to `cypress/screenshots` during headless runs and are excluded from Git. Videos are recorded in `cypress/videos`.

## Reports and GitHub Actions

Before each headless run, the `before:run` hook removes the previous `reports/` directory once for the entire suite. Each run generates a single consolidated Mochawesome report at `reports/test-report.html`, plus its JSON source. The report groups results by suite, making API and UI tests distinguishable inside the same file. Reports do not embed screenshots or videos; those files are stored separately.

The `Daily Cypress Tests` workflow runs the full suite in Chrome automatically every day at **06:00 America/Sao_Paulo (09:00 UTC)**. It has no manual trigger.

For manual execution, open **Actions > Manual Cypress Tests > Run workflow** in GitHub and choose `all`, `@api`, `@ui`, `@auth`, `@positive`, or `@negative`. This separate workflow has no schedule. Both workflows use the artifact retention settings below.

Filter a local run by tag with `@cypress/grep`:

```bash
npm run test:api -- --expose grepTags=@negative,grepOmitFiltered=true
```

Download artifacts from the workflow run's **Artifacts** section:

| Artifact | Availability | Retention |
| --- | --- | --- |
| `test-reports` | Uploaded after passing or failing runs; includes generated HTML/JSON reports and the execution log | 30 days |
| `failure-evidence` | Uploaded when the test step fails; includes available videos and failure screenshots | 7 days |

The workflow preserves the failing test exit code, so failed tests mark the run as failed even when artifacts upload successfully. If Cypress cannot start, an HTML report or visual evidence may not exist; the execution log is still uploaded when the test step starts. Installation failures are available in the GitHub Actions step logs.

The schedule becomes active after this workflow reaches the repository's default branch. GitHub may delay scheduled runs during busy periods; the cron time is not a guarantee of an exact start time.

## Troubleshooting

If Cypress fails to start with `bad option: --smoke-test`, check whether your terminal has `ELECTRON_RUN_AS_NODE=1` set. In PowerShell, remove it from the current session and retry:

```powershell
Remove-Item Env:ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue
npm run cy:verify
```
