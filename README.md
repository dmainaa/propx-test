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
├── .github/
│   └── workflows/
│       └── auto-tag.yml         # Automatic tagging workflow
├── cypress/
│   ├── e2e/
│   │   └── login_test.cy.js    # Login functionality tests
│   └── support/
│       ├── commands/            # Custom commands organized by category
│       │   ├── auth.js          # Authentication commands
│       │   ├── navigation.js   # Navigation commands
│       │   ├── forms.js         # Form interaction commands
│       │   ├── api.js           # API mocking commands
│       │   ├── index.js         # Commands index
│       │   └── README.md        # Commands documentation
│       └── e2e.js               # Support file entry point
├── cypress.config.js            # Cypress configuration
├── package.json                 # Project dependencies
├── .gitignore                   # Git ignore rules
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

This project uses custom Cypress commands organized into logical modules. Commands are located in [cypress/support/commands/](cypress/support/commands/) and grouped by functionality:

### Authentication ([auth.js](cypress/support/commands/auth.js))
- `cy.fillEmail(email)` - Fill the email input field
- `cy.fillPassword(password)` - Fill the password input field
- `cy.clickSubmit()` - Click the submit button
- `cy.login(email, password)` - Complete login flow

### Navigation ([navigation.js](cypress/support/commands/navigation.js))
- `cy.goToLogin()` - Navigate to the login page
- `cy.navigateTo(path, queryParams)` - Navigate with optional query parameters
- `cy.verifyUrlIncludes(path)` - Verify URL contains path

### Forms ([forms.js](cypress/support/commands/forms.js))
- `cy.fillFieldByLabel(label, value)` - Fill form field by label text
- `cy.verifyErrorMessage(message)` - Verify error message visibility
- `cy.clearForm(selector)` - Clear all form inputs

### API Mocking ([api.js](cypress/support/commands/api.js))
- `cy.interceptLogin()` - Intercept login API requests
- `cy.mockSuccessfulLogin(userData)` - Mock successful login
- `cy.mockFailedLogin(errorMessage)` - Mock failed login

### Utilities ([utilities.js](cypress/support/commands/utilities.js))
- `cy.generateRandomEmail(domain, prefix)` - Generate random email
- `cy.fillRandomEmail(selector, domain, prefix)` - Fill field with random email
- `cy.generateRandomString(length, charset)` - Generate random string
- `cy.generateRandomPhone(format)` - Generate random phone number
- `cy.generateTestData(schema)` - Generate test data object

For detailed documentation and examples, see [cypress/support/commands/README.md](cypress/support/commands/README.md).

## Versioning and Releases

This project uses automated semantic versioning. When changes are pushed to the main/master branch:
- A new tag is automatically created with an incremented patch version (e.g., v0.1.0 → v0.1.1)
- A GitHub release is automatically generated

### Manual Version Bumps

To manually bump to a minor or major version:

```bash
# For minor version bump (v0.1.0 → v0.2.0)
git tag -a v0.2.0 -m "Minor version bump"
git push origin v0.2.0

# For major version bump (v0.1.0 → v1.0.0)
git tag -a v1.0.0 -m "Major version bump"
git push origin v1.0.0
```

## Contributing

When adding new tests:
1. Follow the existing test structure
2. Use descriptive test names
3. Add appropriate assertions
4. Document any custom commands

## Notes

- Tests are configured to run against the login page with redirect
- Ensure the application is running before executing tests
