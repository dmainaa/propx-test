# PropX Test - Cypress E2E Tests

This project contains end-to-end tests for the PropX application using Cypress.

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

## Installation

Install the project dependencies:

```bash
npm install
```

## Running Tests

### Open Cypress Test Runner

To open the interactive Cypress Test Runner:

```bash
npx cypress open
```

### Run Tests in Headless Mode

To run all tests in headless mode:

```bash
npx cypress run
```

### Run Specific Test File

```bash
npx cypress run --spec "cypress/e2e/login_test.cy.js"
```

## Project Structure

```
propx-test/
├── cypress/
│   └── e2e/
│       └── login_test.cy.js    # Login functionality tests
├── cypress.config.js            # Cypress configuration
├── package.json                 # Project dependencies
└── README.md                    # This file
```

## Test Suites

### Login Test Suite

The login test suite ([login_test.cy.js](cypress/e2e/login_test.cy.js)) covers:

- Username and password field visibility
- Empty field validation
- Password length validation
- Invalid credentials handling
- Successful login and redirection

## Configuration

The application under test is configured to run at:
- Base URL: `http://localhost:5173`

To modify this or other settings, edit [cypress.config.js](cypress.config.js).

## Custom Commands

This project uses custom Cypress commands defined in the support files:
- `cy.fillEmail()`
- `cy.fillPassword()`
- `cy.clickSubmit()`

## Contributing

When adding new tests:
1. Follow the existing test structure
2. Use descriptive test names
3. Add appropriate assertions
4. Document any custom commands

## Notes

- Tests are configured to run against the login page with redirect
- Ensure the application is running before executing tests
