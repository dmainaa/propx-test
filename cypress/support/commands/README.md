# Custom Cypress Commands

This directory contains organized custom Cypress commands grouped by functionality.

## Structure

```
commands/
├── index.js          # Central import file - imports all command modules
├── auth.js           # Authentication-related commands
├── navigation.js     # Navigation and URL commands
├── forms.js          # Form interaction commands
├── api.js            # API mocking and interception commands
└── README.md         # This file
```

## Available Commands

### Authentication Commands ([auth.js](auth.js))

- `cy.fillEmail(email)` - Fill the email input field
- `cy.fillPassword(password)` - Fill the password input field
- `cy.clickSubmit()` - Click the submit button
- `cy.login(email, password)` - Complete login flow

### Navigation Commands ([navigation.js](navigation.js))

- `cy.goToLogin()` - Navigate to the login page
- `cy.navigateTo(path, queryParams)` - Navigate to a page with optional query params
- `cy.verifyUrlIncludes(path)` - Verify URL contains a specific path

### Form Commands ([forms.js](forms.js))

- `cy.fillFieldByLabel(label, value)` - Fill form field by its label text
- `cy.verifyErrorMessage(message)` - Verify an error message is visible
- `cy.clearForm(containerSelector)` - Clear all form inputs

### API Commands ([api.js](api.js))

- `cy.interceptLogin()` - Intercept and wait for login API requests
- `cy.mockSuccessfulLogin(userData)` - Mock a successful login response
- `cy.mockFailedLogin(errorMessage)` - Mock a failed login response

### Utility Commands ([utilities.js](utilities.js))

- `cy.generateRandomEmail(domain, prefix)` - Generate a random email address
- `cy.fillRandomEmail(selector, domain, prefix)` - Generate and fill a random email
- `cy.generateRandomString(length, charset)` - Generate a random string
- `cy.generateRandomPhone(format)` - Generate a random phone number
- `cy.generateTestData(schema)` - Generate an object with random test data

## Adding New Commands

1. Create a new file in this directory (e.g., `dashboard.js`)
2. Add your commands with JSDoc comments:

```javascript
/**
 * Description of what the command does
 * @param {type} paramName - Parameter description
 * @example cy.commandName('example')
 */
Cypress.Commands.add('commandName', (param) => {
    // Implementation
})
```

3. Import the new file in [index.js](index.js):

```javascript
import './dashboard'
```

## Best Practices

1. **Group by functionality** - Keep related commands together
2. **Document commands** - Use JSDoc comments with examples
3. **Keep commands focused** - Each command should do one thing well
4. **Reuse commands** - Build complex commands from simpler ones
5. **Use meaningful names** - Command names should be self-explanatory

## Examples

### Using Authentication Commands

```javascript
describe('Login', () => {
    it('should login successfully', () => {
        cy.goToLogin()
        cy.login('user@example.com', 'password123')
        cy.verifyUrlIncludes('/dashboard')
    })
})
```

### Using API Mocking

```javascript
describe('Login with mocked API', () => {
    it('should handle login failure', () => {
        cy.mockFailedLogin('Invalid credentials')
        cy.goToLogin()
        cy.login('wrong@example.com', 'wrongpass')
        cy.verifyErrorMessage('Invalid credentials')
    })
})
```

### Using Random Email Generator

```javascript
describe('User Registration', () => {
    it('should register with random email', () => {
        const email = cy.generateRandomEmail('test.com', 'newuser')
        // Returns: 'newuser_abc123_1704649200000@test.com'

        cy.visit('/register')
        cy.get('input[name="email"]').type(email)
        cy.get('input[name="password"]').type('password123')
        cy.get('button[type="submit"]').click()
    })

    it('should use fillRandomEmail helper', () => {
        cy.visit('/register')
        cy.fillRandomEmail('@emailInputField', 'example.com', 'qa')
            .then((email) => {
                // Use the generated email for assertions
                cy.log(`Generated email: ${email}`)
            })
    })
})
```

### Using Utility Commands

```javascript
describe('Generate Test Data', () => {
    it('should create random strings', () => {
        const username = cy.generateRandomString(8, 'alphanumeric')
        const code = cy.generateRandomString(6, 'numeric')
        // username: 'aB3xY9pQ'
        // code: '123456'
    })

    it('should generate phone numbers', () => {
        const phone1 = cy.generateRandomPhone() // '5551234567'
        const phone2 = cy.generateRandomPhone('(###) ###-####') // '(555) 123-4567'
    })

    it('should generate complete test data', () => {
        const testData = cy.generateTestData({
            email: 'email',
            password: 'string:12',
            phone: 'phone',
            firstName: 'John'  // Static value
        })
        // Returns object with random email, 12-char password, random phone, and 'John'
    })
})
```
