/**
 * Lighthouse Performance Auditing Tests
 *
 * This test suite uses Lighthouse to audit page performance, accessibility,
 * best practices, and SEO.
 */

describe('Lighthouse Performance Tests', () => {

    it('Should audit the register page with default thresholds', () => {
        cy.visit('http://localhost:5173/auth/register')

        // Run Lighthouse audit with default thresholds
        cy.lighthouse()
    })

    it('Should audit the register page with custom thresholds', () => {
        cy.visit('http://localhost:5173/auth/register')

        // Run Lighthouse audit with custom thresholds
        cy.lighthouse({
            performance: 50,
            accessibility: 90,
            'best-practices': 80,
            seo: 80,
            pwa: 50
        })
    })

    it('Should audit specific performance metrics', () => {
        cy.visit('http://localhost:5173/auth/register')

        // Run Lighthouse audit focusing on specific metrics
        cy.lighthouse({
            performance: 70,
            accessibility: 100,
            'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
            'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
            'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
            'total-blocking-time': ['error', { maxNumericValue: 300 }]
        })
    })

    it('Should audit the register page in mobile view', () => {
        cy.visit('http://localhost:5173/auth/register')

        // Run Lighthouse audit with mobile configuration
        cy.lighthouse(
            {
                performance: 60,
                accessibility: 90
            },
            {
                formFactor: 'mobile',
                screenEmulation: {
                    mobile: true,
                    width: 375,
                    height: 667,
                    deviceScaleFactor: 2
                }
            }
        )
    })

    it('Should audit the register page in desktop view', () => {
        cy.visit('http://localhost:5173/auth/register')

        // Run Lighthouse audit with desktop configuration
        cy.lighthouse(
            {
                performance: 70,
                accessibility: 90
            },
            {
                formFactor: 'desktop',
                screenEmulation: {
                    mobile: false,
                    width: 1350,
                    height: 940,
                    deviceScaleFactor: 1
                }
            }
        )
    })

    it('Should audit multiple pages in sequence', () => {
        // Audit register page
        cy.visit('http://localhost:5173/auth/register')
        cy.lighthouse({
            performance: 60,
            accessibility: 90
        })

        // Register a user and audit the next page
        cy.registerUser({
            portalType: 'landlord',
            waitForApi: true,
            verifyRedirect: true
        })

        // Audit onboarding page
        cy.lighthouse({
            performance: 60,
            accessibility: 90
        })
    })
})
