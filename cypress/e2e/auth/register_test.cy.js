
describe('Register Test Suite', () => {

    beforeEach(() => {
    cy.visit('http://localhost:5173/auth/register')
    cy.get("label[aria-label='Tenant']").find('input[name="portal"][type="radio"]')
    .as('tenantPortalSelector')

    cy.get("label[aria-label='Landlord']").find('input[name="portal"][type="radio"]')
    .as('landlordPortalSelector')

    cy.get("label[aria-label='Agent']").find('input[name="portal"][type="radio"]')
    .as('agentPortalSelector')
    
    cy.get("input[type='text'][placeholder='John']").as('firstNameInputField')

    cy.get("input[type='text'][placeholder='Nogh']").as('lastNameInputField')

    cy.get("input[type='tel'][placeholder='Enter phone number']").as('phoneInputField')

    cy.get("input[type='email']").as('emailInputField')

    cy.get("input[type='password'][placeholder='Create a password']").as('passwordInputField')

    cy.get("input[type='password'][placeholder='Confirm your password']").as('confirmPasswordInputField')

    cy.contains('I Agree To Terms & Conditions').as('termsCheckBox')

    cy.contains('I Agree To Privacy Policy').as('privacyPolicy')

    cy.get('button[type="submit"]').as('submitButton')

    })

    it('should verify portal selectors and top form fields are visible', () => {
        cy.get('@tenantPortalSelector').should('be.visible')
        cy.get('@landlordPortalSelector').should('be.visible')
        cy.get('@agentPortalSelector').should('be.visible')
        cy.get('@firstNameInputField').should('be.visible')
        cy.get('@lastNameInputField').should('be.visible')
        cy.get('@phoneInputField').should('be.visible')
    })

    it('should verify bottom form fields and checkboxes are visible after scrolling', () => {
        cy.get('@emailInputField').scrollIntoView().should('be.visible')
        cy.get('@passwordInputField').scrollIntoView().should('be.visible')
        cy.get('@confirmPasswordInputField').scrollIntoView().should('be.visible')
        cy.get('@termsCheckBox').scrollIntoView().should('be.visible')
        cy.get('@privacyPolicy').scrollIntoView().should('be.visible')
    })

    it('Should verify that if no portal is selected, the appropriate message is shown', () => {
        cy.fillFirstName()
        cy.fillLastName()
        cy.fillPhoneNumber()
        cy.fillEmail()
        cy.fillPassword('Password')
        cy.fillConfirmPassword('Password')
        cy.checkTermsCheckbox()
        cy.checkPrivacyPolicyCheckbox()
        cy.clickSubmit()
        cy.contains('Select Portal ').scrollIntoView().should('be.visible')
    })

    it('Should verify that if no first name is typed, "First name is required" text is found', () => {
        cy.get('@tenantPortalSelector').click()
        cy.fillLastName()
        cy.fillPhoneNumber()
        cy.fillEmail()
        cy.fillPassword('Password')
        cy.fillConfirmPassword('Password')
        cy.checkTermsCheckbox()
        cy.checkPrivacyPolicyCheckbox()
        cy.clickSubmit()
        cy.contains('First name is required').should('be.visible')
    })

    it('Should verify that if no last name is typed, "Last name is required" text is found', () => {
        cy.get('@tenantPortalSelector').click()
        cy.fillFirstName()
        cy.fillPhoneNumber()
        cy.fillEmail()
        cy.fillPassword('Password')
        cy.fillConfirmPassword('Password')
        cy.checkTermsCheckbox()
        cy.checkPrivacyPolicyCheckbox()
        cy.clickSubmit()
        cy.contains('Last name is required').should('be.visible')
    })

    it('Should verify that if no phone number is entered, "Phone number is required" is shown', () => {
        cy.get('@tenantPortalSelector').click()
        cy.fillFirstName()
        cy.fillLastName()
        cy.fillEmail()
        cy.fillPassword('Password')
        cy.fillConfirmPassword('Password')
        cy.checkTermsCheckbox()
        cy.checkPrivacyPolicyCheckbox()
        cy.clickSubmit()
        cy.contains('Phone number is required').should('be.visible')
    })

    it('Should verify that if no email is entered, "Email is required" text is seen', () => {
        cy.get('@tenantPortalSelector').click()
        cy.fillFirstName()
        cy.fillLastName()
        cy.fillPhoneNumber()
        cy.fillPassword('Password')
        cy.fillConfirmPassword('Password')
        cy.checkTermsCheckbox()
        cy.checkPrivacyPolicyCheckbox()
        cy.clickSubmit()
        cy.contains('Email is required').scrollIntoView().should('be.visible')
    })

    it('Should verify that if password is not entered, "Password is required" is shown', () => {
        cy.get('@tenantPortalSelector').click()
        cy.fillFirstName()
        cy.fillLastName()
        cy.fillPhoneNumber()
        cy.fillEmail()
        cy.fillConfirmPassword('Password')
        cy.checkTermsCheckbox()
        cy.checkPrivacyPolicyCheckbox()
        cy.clickSubmit()
        cy.contains('Password is required').scrollIntoView().should('be.visible')
    })

    it('Should verify that if both passwords do not match, "Passwords do not match" is shown', () => {
        cy.get('@tenantPortalSelector').click()
        cy.fillFirstName()
        cy.fillLastName()
        cy.fillPhoneNumber()
        cy.fillEmail()
        cy.fillPassword('Password123')
        cy.fillConfirmPassword('DifferentPassword')
        cy.checkTermsCheckbox()
        cy.checkPrivacyPolicyCheckbox()
        cy.clickSubmit()
        cy.contains('Passwords do not match').scrollIntoView().should('be.visible')
    })

    it('Should verify that if terms checkbox is not checked, native validation is present', () => {
        cy.get('@tenantPortalSelector').click()
        cy.fillFirstName()
        cy.fillLastName()
        cy.fillPhoneNumber()
        cy.fillEmail()
        cy.fillPassword('Password')
        cy.fillConfirmPassword('Password')
        cy.checkPrivacyPolicyCheckbox()
        cy.clickSubmit()
        cy.get('@termsCheckBox').parent().find('input[type="checkbox"]').then($checkbox => {
            expect($checkbox[0].validity.valid).to.be.false
        })
    })

    it('Should verify that if privacy policy checkbox is not checked, native validation is present', () => {
        cy.get('@tenantPortalSelector').click()
        cy.fillFirstName()
        cy.fillLastName()
        cy.fillPhoneNumber()
        cy.fillEmail()
        cy.fillPassword('Password')
        cy.fillConfirmPassword('Password')
        cy.checkTermsCheckbox()
        cy.clickSubmit()
        cy.get('@privacyPolicy').parent().find('input[type="checkbox"]').then($checkbox => {
            expect($checkbox[0].validity.valid).to.be.false
        })
    })

    it('Should verify native email validation for invalid email format', () => {
        cy.get('@tenantPortalSelector').click()
        cy.fillFirstName()
        cy.fillLastName()
        cy.fillPhoneNumber()
        cy.get('@emailInputField').scrollIntoView().type('invalidemail')
        cy.fillPassword('Password')
        cy.fillConfirmPassword('Password')
        cy.checkTermsCheckbox()
        cy.checkPrivacyPolicyCheckbox()
        cy.clickSubmit()
        cy.get('@emailInputField').then($email => {
            expect($email[0].validity.valid).to.be.false
            expect($email[0].validity.typeMismatch).to.be.true
        })
    })

    it('Should redirect to onboarding/company when landlord is selected and form is submitted', () => {
        cy.intercept('POST', '**/auth/register').as('registerRequest')
        cy.get('@landlordPortalSelector').click()
        cy.fillFirstName()
        cy.fillLastName()
        cy.fillPhoneNumber()
        cy.fillEmail()
        const password = 'TestPassword123!'
        cy.fillPassword(password)
        cy.fillConfirmPassword(password)
        cy.checkTermsCheckbox()
        cy.checkPrivacyPolicyCheckbox()

        // Submit the form
        cy.clickSubmit()

        // Wait for the register API call to complete
        cy.wait('@registerRequest').its('response.statusCode').should('eq', 200)

        // Verify redirect to onboarding/company
        cy.url().should('include', '/onboarding/company')
    })

    it('Should redirect to onboarding/lease-application when tenant is selected and form is submitted', () => {
        cy.intercept('POST', '**/auth/register').as('registerRequest')
        cy.get('@tenantPortalSelector').click()
        cy.fillFirstName()
        cy.fillLastName()
        cy.fillPhoneNumber()
        cy.fillEmail()
        const password = 'TestPassword123!'
        cy.fillPassword(password)
        cy.fillConfirmPassword(password)
        cy.checkTermsCheckbox()
        cy.checkPrivacyPolicyCheckbox()
        cy.clickSubmit()
        cy.wait('@registerRequest').its('response.statusCode').should('eq', 200)
        cy.url().should('include', '/onboarding/lease-application')
    })

    it('Should redirect to agent/company-switch when agent is selected and form is submitted', () => {

        cy.intercept('POST', '**/auth/register').as('registerRequest')
        cy.get('@agentPortalSelector').click()
        cy.fillFirstName()
        cy.fillLastName()
        cy.fillPhoneNumber()
        cy.fillEmail()
        const password = 'TestPassword123!'
        cy.fillPassword(password)
        cy.fillConfirmPassword(password)
        cy.checkTermsCheckbox()
        cy.checkPrivacyPolicyCheckbox()
        cy.clickSubmit()
        cy.wait('@registerRequest').its('response.statusCode').should('eq', 200)

        // Verify redirect to agent/company-switch
        cy.url().should('include', '/agent/company-switch')
    })
})