import loginPage from '../pages/auth/login_page'

describe('Login Test Suite', () => {

    beforeEach(() => {
        loginPage.visit()
    })

    it('Verify that the username and password fields are visible', () => {
        loginPage.emailInputField.should('be.visible')
        loginPage.passwordInputField.should('be.visible')
    })

    it('Verify if the username field is empty and sign-in button is clicked, the appropriate message is shown', () => {
        loginPage.clickSubmit()
        cy.contains('Email or phone number is required').should('be.visible')
    })

    it('Verify if the password field is empty and sign-in button is clicked, the appropriate message is shown', () => {
        loginPage.fillEmail('someemail@gmail.com')
        loginPage.clickSubmit()
        cy.contains('Password is required').should('be.visible')
    })

    it('Verify if the entered password is less than 6 characters, the appropriate message is shown', () => {
        loginPage.fillEmail('someemail@gmail.com')
        loginPage.fillPassword('Pass')
        loginPage.clickSubmit()
        cy.contains('Password must be at least 6 characters').should('be.visible')
    })

    it('Verify if the login credentials are invalid, the appropriate message is shown', () => {
        cy.intercept('POST', '**/login').as('loginRequest')
        loginPage.fillEmail('someemail@gmail.com')
        loginPage.fillPassword('Password')
        loginPage.clickSubmit()
        cy.wait('@loginRequest')
        cy.contains('User with that Email or Phone does not exists.')
    })

    it('Verify when the right credentials are filled, the user is redirected to the dashboard screen', () => {
        loginPage.fillEmail('0715823592')
        loginPage.fillPassword('password')
        loginPage.clickSubmit()
        cy.url().should('include', '/portal-selection')
    })
})
