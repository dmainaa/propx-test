/**
 * API-based authentication commands
 */

import { User } from '../../../models/user'

Cypress.Commands.add('registerUserViaAPI', (portal, options = {}) => {
    
    const validPortals = [1, 2, 3]
    if (!validPortals.includes(portal)) {
        throw new Error(`Invalid portal. Must be one of: ${validPortals.join(', ')} (1=tenant, 2=agent, 3=landlord)`)
    }

    // Generate user data with defaults
    const firstName = options.firstName || Cypress.generateRandomString(8, 'alphabetic')
    const lastName = options.lastName || Cypress.generateRandomString(10, 'alphabetic')
    const phone = options.phone || Cypress.generateRandomPhone()
    const email = options.email || Cypress.generateRandomEmail()
    const password = options.password || 'Password'

    // Construct payload
    const payload = {
        first_name: firstName,
        last_name: lastName,
        name: `${firstName} ${lastName}`,
        phone: phone,
        email: email,
        password: password,
        password_confirmation: password,
        portal: portal,
        terms: true,
        policy: true
    }

    // Make API request
    return cy.request({
        method: 'POST',
        url: 'https://propx-core.on-forge.com/api/v1/auth/register',
        body: payload,
        failOnStatusCode: false
    }).then((response) => {
        if (response.status !== 200 && response.status !== 201) {
            cy.log('Registration Failed:', JSON.stringify(response.body, null, 2))
        }

        expect(response.status, 'Registration API should return 200').to.be.oneOf([200, 201])
        const loggedInUser = response.body.data.logged_in_user
        const userData = loggedInUser.user
        const token = loggedInUser.token

        // Add password and token to user data
        const userDataWithCredentials = {
            ...userData,
            password: password,
            token: token,
            portal: portal // Add portal from request since it's not in response
        }

        // Create and return User instance
        const user = new User(userDataWithCredentials)

        return cy.wrap(user)
    })
})

Cypress.Commands.add('loginUserViaApi', (username, password) => {
    return cy.request('POST', `${Cypress.env('apiUrl')}/auth/login`, {
        "username": username,
        "password": password
    }).then((response) => {
        if(response.status != 200 || response.status != 201 ) {
            cy.log('Loggin in failed', JSON.stringify(response.body))
        }

        expect(response.status).to.be.oneOf([200, 201])
        Cypress.env('token', response.body.data.token)
    })
})


