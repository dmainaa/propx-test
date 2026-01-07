
describe('Login Test Suite', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/auth/login?redirect=/login')
        cy.get('input[type="text"]').as('emailInputField')
        cy.get('input[type="password"]').as('passwordInputField')
        cy.get('button[type="submit"]').as('submitButton')
    })

    it('Verify that the username and password fields are visible', () => {
        cy.get('@emailInputField').should('be.visible')
        cy.get('@passwordInputField').should('be.visible')
    })

    it('Verify if the username field is empty and sign-in button is clicked, the appropriate message is shown', () => {
        cy.clickSubmit()
        cy.contains('Email or phone number is required').should('be.visible')
    })

    it('Verify if the password field is empty and sign-in button is clicked, the appropriate message is shown', () => {
        cy.fillEmail('someemail@gmail.com')
        cy.clickSubmit()
        cy.contains('Password is required').should('be.visible')
    })

    it('Verify if the entered password is less than 6 characters, the appropriate message is shown', () => {
        cy.fillEmail('someemail@gmail.com')
        cy.fillPassword('Pass')
        cy.clickSubmit()
        cy.contains('Password must be at least 6 characters').should('be.visible')
    })

    it('Verify if the login credentials are invalid, the appropriate message is shown', () => {
        cy.intercept('POST', '**/login').as('loginRequest')
        cy.fillEmail('averyfakeemail@gmail.com')
        cy.fillPassword('Password')
        cy.clickSubmit()
        cy.wait('@loginRequest')
        cy.contains('User with that Email or Phone does not exists.')
    })

    it('Verify when the right credentials are filled, the user is redirected to the dashboard screen', () => {
        cy.fillEmail('0715823592')
        cy.fillPassword('password')
        cy.clickSubmit()
        cy.url().should('include', '/dashboard')
    })


})