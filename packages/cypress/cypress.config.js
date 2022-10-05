const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const nodePolyfills = require('@esbuild-plugins/node-modules-polyfill').NodeModulesPolyfillPlugin;
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  video: true,
  defaultCommandTimeout: 40000,
  env: {
    API_BASE_URL: 'http://localhost/openmrs/ws/rest/v1',
    ADMIN_USERNAME: 'admin',
    ADMIN_PASSWORD: 'Admin123',
    ADMIN_UUID: '82f18b44-6814-11e8-923f-e9a88dcb533f',
    DEFAULT_LOCATION_UUID: '44c3efb0-2583-4c80-a79e-1f756a03c0a1',
    DEFAULT_LOCATION_NAME: 'Outpatient Clinic',
  },
  viewportWidth: 1800,
  viewportHeight: 900,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  chromeWebSecurity: false,
  e2e: {
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [nodePolyfills(), createEsbuildPlugin(config)],
      });
      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);

      return config;
    },
    specPattern: "resources/features/**/**/*.feature",
    supportFile: './cypress/support/e2e.js',
    baseUrl: 'http://localhost/openmrs/spa'
  },
})
