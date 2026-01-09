/**
 * Utility custom commands
 */

const generateRandomString = (length = 10, charset = 'alphanumeric') => {
    let characters

    switch(charset) {
        case 'alphanumeric':
            characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            break
        case 'alphabetic':
            characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
            break
        case 'numeric':
            characters = '0123456789'
            break
        case 'lowercase':
            characters = 'abcdefghijklmnopqrstuvwxyz'
            break
        case 'uppercase':
            characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            break
        default:
            characters = charset
    }

    let result = ''
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}

const generateRandomEmail = (domain = 'example.com', prefix = 'user') => {
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 8)
    return `${prefix}_${randomString}_${timestamp}@${domain}`
}

const generateRandomPhone = (format = 'US') => {
    if (format === 'US') {
        const areaCode = Math.floor(Math.random() * 900) + 100
        const exchange = Math.floor(Math.random() * 900) + 100
        const lineNumber = Math.floor(Math.random() * 9000) + 1000
        return `${areaCode}${exchange}${lineNumber}`
    }
    return generateRandomString(10, 'numeric')
}

const generateRandomPassword = (length = 12) => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'
    const special = '!@#$%^&*'
    const allChars = lowercase + uppercase + numbers + special

    let password = ''
    password += lowercase.charAt(Math.floor(Math.random() * lowercase.length))
    password += uppercase.charAt(Math.floor(Math.random() * uppercase.length))
    password += numbers.charAt(Math.floor(Math.random() * numbers.length))
    password += special.charAt(Math.floor(Math.random() * special.length))

    for (let i = password.length; i < length; i++) {
        password += allChars.charAt(Math.floor(Math.random() * allChars.length))
    }

    return password.split('').sort(() => Math.random() - 0.5).join('')
}

// Export helper functions for use in other commands
Cypress.generateRandomString = generateRandomString
Cypress.generateRandomEmail = generateRandomEmail
Cypress.generateRandomPhone = generateRandomPhone
Cypress.generateRandomPassword = generateRandomPassword

Cypress.Commands.add('generateRandomEmail', (domain = 'example.com', prefix = 'user') => {
    return generateRandomEmail(domain, prefix)
})

Cypress.Commands.add('fillRandomEmail', (selector, domain = 'example.com', prefix = 'user') => {
    const email = generateRandomEmail(domain, prefix)
    cy.get(selector).type(email)
    return cy.wrap(email)
})

Cypress.Commands.add('generateRandomString', (length = 10, charset = 'alphanumeric') => {
    return generateRandomString(length, charset)
})

Cypress.Commands.add('generateRandomPhone', (format = 'US') => {
    return generateRandomPhone(format)
})

Cypress.Commands.add('generateRandomPassword', (length = 12) => {
    return generateRandomPassword(length)
})

