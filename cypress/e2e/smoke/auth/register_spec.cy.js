import registerPage from '../../pages/auth/register_page'

describe('Register Smoke Test Suite', () => {

    it('Should successfully register a tenant account and redirect to lease-application onboarding', () => {
        cy.intercept('POST', '**/auth/register').as('registerRequest')
        registerPage.registerUser('tenant')
        cy.wait('@registerRequest').its('response.statusCode').should('eq', 200)
        cy.url().should('include', '/onboarding/lease-application')
    })

    it('Should successfully register a landlord account and redirect to company onboarding', () => {
        cy.intercept('POST', '**/auth/register').as('registerRequest')
        registerPage.registerUser('landlord')
        cy.wait('@registerRequest').its('response.statusCode').should('eq', 200)
        cy.url().should('include', '/onboarding/company')
    })

    it('Should successfully register an agent account and redirect to agent portal', () => {
        cy.intercept('POST', '**/auth/register').as('registerRequest')
        registerPage.registerUser('agent')
        cy.wait('@registerRequest').its('response.statusCode').should('eq', 200)
        cy.url().should('include', '/agent')
    })
})
