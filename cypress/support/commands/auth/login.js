
Cypress.Commands.add('interceptLogin', () => {
    cy.intercept('POST', '**/login').as('loginRequest')
    return cy.get('@loginRequest')
})

Cypress.Commands.add('mockSuccessfulLogin', (userData = {}) => {
    cy.intercept('POST', '**/login', {
        statusCode: 200,
        body: {
            success: true,
            user: {
                id: '123',
                email: 'test@example.com',
                ...userData
            }
        }
    }).as('loginRequest')
})

Cypress.Commands.add('mockFailedLogin', (errorMessage = 'Invalid credentials') => {
    cy.intercept('POST', '**/login', {
        statusCode: 401,
        body: {
            success: false,
            message: errorMessage
        }
    }).as('loginRequest')
})
