const { defineConfig } = require("cypress");
const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");

try {
  require('dotenv').config();
} catch (e) {
  // dotenv not installed, environment variables will come from process.env
}

const baseApiUrl = process.env.API_URL || 'https://propertyx.test/api/v1'
const appApiUrl = '/app/1'


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });

      on("task", {
        lighthouse: lighthouse(),
      });

      return config;
    },
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    video: process.env.CYPRESS_VIDEO === 'true',
    apiUrl: baseApiUrl,
    appApiUrl: appApiUrl,
    screenshotOnRunFailure: process.env.CYPRESS_SCREENSHOT !== 'false',
    env: {
      apiUrl: process.env.API_URL,
      appAPIUrl: `${process.env.API_URL}/app/1`,
      tenantAPIUrl: `${process.env.API_URL}/tenant`,
      vendorAPIUrl: `${process.env.API_URL}/vendor`,
    }
  },

  projectId: "jvu87n",
});
