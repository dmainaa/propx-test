
import registerPage from '../pages/auth/register_page'

describe('Register Test Suite', () => {

    beforeEach(() => {
        registerPage.visit()
    })

    it('should verify portal selectors and top form fields are visible', () => {
        registerPage.tenantPortalSelector.should('be.visible')
        registerPage.landlordPortalSelector.should('be.visible')
        registerPage.agentPortalSelector.should('be.visible')
        registerPage.firstNameInputField.should('be.visible')
        registerPage.lastNameInputField.should('be.visible')
        registerPage.phoneInputField.should('be.visible')
    })

    it('should verify bottom form fields and checkboxes are visible after scrolling', () => {
        registerPage.emailInputField.scrollIntoView().should('be.visible')
        registerPage.passwordInputField.scrollIntoView().should('be.visible')
        registerPage.confirmPasswordInputField.scrollIntoView().should('be.visible')
        registerPage.termsCheckBox.scrollIntoView().should('be.visible')
        registerPage.privacyPolicy.scrollIntoView().should('be.visible')
    })

    it('Should verify that if no portal is selected, the appropriate message is shown', () => {
        registerPage.fillFirstName()
        registerPage.fillLastName()
        registerPage.fillPhoneNumber()
        registerPage.fillEmail()
        registerPage.fillPassword('Password')
        registerPage.fillConfirmPassword('Password')
        registerPage.checkTermsCheckbox()
        registerPage.checkPrivacyPolicyCheckbox()
        registerPage.clickSubmit()
        cy.contains('Select Portal ').scrollIntoView().should('be.visible')
    })

    it('Should verify that if no first name is typed, "First name is required" text is found', () => {
        registerPage.tenantPortalSelector.click()
        registerPage.fillLastName()
        registerPage.fillPhoneNumber()
        registerPage.fillEmail()
        registerPage.fillPassword('Password')
        registerPage.fillConfirmPassword('Password')
        registerPage.checkTermsCheckbox()
        registerPage.checkPrivacyPolicyCheckbox()
        registerPage.clickSubmit()
        cy.contains('First name is required').should('be.visible')
    })

    it('Should verify that if no last name is typed, "Last name is required" text is found', () => {
        registerPage.tenantPortalSelector.click()
        registerPage.fillFirstName()
        registerPage.fillPhoneNumber()
        registerPage.fillEmail()
        registerPage.fillPassword('Password')
        registerPage.fillConfirmPassword('Password')
        registerPage.checkTermsCheckbox()
        registerPage.checkPrivacyPolicyCheckbox()
        registerPage.clickSubmit()
        cy.contains('Last name is required').should('be.visible')
    })

    it('Should verify that if no phone number is entered, "Phone number is required" is shown', () => {
        registerPage.tenantPortalSelector.click()
        registerPage.fillFirstName()
        registerPage.fillLastName()
        registerPage.fillEmail()
        registerPage.fillPassword('Password')
        registerPage.fillConfirmPassword('Password')
        registerPage.checkTermsCheckbox()
        registerPage.checkPrivacyPolicyCheckbox()
        registerPage.clickSubmit()
        cy.contains('Phone number is required').should('be.visible')
    })

    it('Should verify that if no email is entered, "Email is required" text is seen', () => {
        registerPage.tenantPortalSelector.click()
        registerPage.fillFirstName()
        registerPage.fillLastName()
        registerPage.fillPhoneNumber()
        registerPage.fillPassword('Password')
        registerPage.fillConfirmPassword('Password')
        registerPage.checkTermsCheckbox()
        registerPage.checkPrivacyPolicyCheckbox()
        registerPage.clickSubmit()
        cy.contains('Email is required').scrollIntoView().should('be.visible')
    })

    it('Should verify that if password is not entered, "Password is required" is shown', () => {
        registerPage.tenantPortalSelector.click()
        registerPage.fillFirstName()
        registerPage.fillLastName()
        registerPage.fillPhoneNumber()
        registerPage.fillEmail()
        registerPage.fillConfirmPassword('Password')
        registerPage.checkTermsCheckbox()
        registerPage.checkPrivacyPolicyCheckbox()
        registerPage.clickSubmit()
        cy.contains('Password is required').scrollIntoView().should('be.visible')
    })

    it('Should verify that if both passwords do not match, "Passwords do not match" is shown', () => {
        registerPage.tenantPortalSelector.click()
        registerPage.fillFirstName()
        registerPage.fillLastName()
        registerPage.fillPhoneNumber()
        registerPage.fillEmail()
        registerPage.fillPassword('Password123')
        registerPage.fillConfirmPassword('DifferentPassword')
        registerPage.checkTermsCheckbox()
        registerPage.checkPrivacyPolicyCheckbox()
        registerPage.clickSubmit()
        cy.contains('Passwords do not match').scrollIntoView().should('be.visible')
    })

    it('Should verify that if terms checkbox is not checked, native validation is present', () => {
        registerPage.tenantPortalSelector.click()
        registerPage.fillFirstName()
        registerPage.fillLastName()
        registerPage.fillPhoneNumber()
        registerPage.fillEmail()
        registerPage.fillPassword('Password')
        registerPage.fillConfirmPassword('Password')
        registerPage.checkPrivacyPolicyCheckbox()
        registerPage.clickSubmit()
        registerPage.termsCheckBox.parent().find('input[type="checkbox"]').then($checkbox => {
            expect($checkbox[0].validity.valid).to.be.false
        })
    })

    it('Should verify that if privacy policy checkbox is not checked, native validation is present', () => {
        registerPage.tenantPortalSelector.click()
        registerPage.fillFirstName()
        registerPage.fillLastName()
        registerPage.fillPhoneNumber()
        registerPage.fillEmail()
        registerPage.fillPassword('Password')
        registerPage.fillConfirmPassword('Password')
        registerPage.checkTermsCheckbox()
        registerPage.clickSubmit()
        registerPage.privacyPolicy.parent().find('input[type="checkbox"]').then($checkbox => {
            expect($checkbox[0].validity.valid).to.be.false
        })
    })

    it('Should verify native email validation for invalid email format', () => {
        registerPage.tenantPortalSelector.click()
        registerPage.fillFirstName()
        registerPage.fillLastName()
        registerPage.fillPhoneNumber()
        registerPage.emailInputField.scrollIntoView().type('invalidemail')
        registerPage.fillPassword('Password')
        registerPage.fillConfirmPassword('Password')
        registerPage.checkTermsCheckbox()
        registerPage.checkPrivacyPolicyCheckbox()
        registerPage.clickSubmit()
        registerPage.emailInputField.then($email => {
            expect($email[0].validity.valid).to.be.false
            expect($email[0].validity.typeMismatch).to.be.true
        })
    })

    it('Should redirect to onboarding/company when landlord is selected and form is submitted', () => {
        cy.intercept('POST', '**/auth/register').as('registerRequest')
        registerPage.landlordPortalSelector.click()
        registerPage.fillFirstName()
        registerPage.fillLastName()
        registerPage.fillPhoneNumber()
        registerPage.fillEmail()
        const password = 'TestPassword123!'
        registerPage.fillPassword(password)
        registerPage.fillConfirmPassword(password)
        registerPage.checkTermsCheckbox()
        registerPage.checkPrivacyPolicyCheckbox()

        // Submit the form
        registerPage.clickSubmit()

        // Wait for the register API call to complete
        cy.wait('@registerRequest').its('response.statusCode').should('eq', 200)

        // Verify redirect to onboarding/company
        cy.url().should('include', '/onboarding/company')
    })

    it('Should redirect to onboarding/lease-application when tenant is selected and form is submitted', () => {
        cy.intercept('POST', '**/auth/register').as('registerRequest')
        registerPage.tenantPortalSelector.click()
        registerPage.fillFirstName()
        registerPage.fillLastName()
        registerPage.fillPhoneNumber()
        registerPage.fillEmail()
        const password = 'TestPassword123!'
        registerPage.fillPassword(password)
        registerPage.fillConfirmPassword(password)
        registerPage.checkTermsCheckbox()
        registerPage.checkPrivacyPolicyCheckbox()
        registerPage.clickSubmit()
        cy.wait('@registerRequest').its('response.statusCode').should('eq', 200)
        cy.url().should('include', '/onboarding/lease-application')
    })

    it('Should redirect to /agent when agent is selected and form is submitted', () => {
        cy.intercept('POST', '**/auth/register').as('registerRequest')
        registerPage.agentPortalSelector.click()
        registerPage.fillFirstName()
        registerPage.fillLastName()
        registerPage.fillPhoneNumber()
        registerPage.fillEmail()
        const password = 'TestPassword123!'
        registerPage.fillPassword(password)
        registerPage.fillConfirmPassword(password)
        registerPage.checkTermsCheckbox()
        registerPage.checkPrivacyPolicyCheckbox()
        registerPage.clickSubmit()
        cy.wait('@registerRequest').its('response.statusCode').should('eq', 200)

        // Verify redirect to agent/company-switch
        cy.url().should('include', '/agent')
    })
})
