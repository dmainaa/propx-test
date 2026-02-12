const { defineConfig } = require("cypress");
const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");

try {
  require('dotenv').config();
} catch (e) {
  // dotenv not installed, environment variables will come from process.env
}

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
    screenshotOnRunFailure: process.env.CYPRESS_SCREENSHOT !== 'false',
  },

  projectId: "jvu87n",
});
