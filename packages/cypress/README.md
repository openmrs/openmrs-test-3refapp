# Cypress Tests

This package contains an E2E test suite using the [Cypress](https://www.cypress.io/)
framework. This is the "default" package for writing E2E tests (unless you are
interested in writing offline related tests - if so, head over to the
[playwright](./../playwright/) directory).


## Running tests

Please ensure that you have followed the basic installation guide in the
[root README](./../../README.md).
Once everything is setup, you can navigate to this directory (if not done already)
and run the scripts inside the
[package.json](./package.json) file using yarn:

```sh
# Given that you start in the repository's root:
cd packages/cypress

# Run any script from the Cypress project's package.json file, e.g. the login tests:
yarn refapp3Login
```

Generally, there are two ways of running tests:

1. **Running with cypress runner**
   Open the Cypress runner with
    ```
    cypress open
    ```
   and pick a test from the GUI.

2. **Running in command line**

   Run the desired test using `yarn run`, e.g.

    ```
    yarn run refapp3Login
    ```

   See the `scripts` section of [package.json](https://github.com/openmrs/openmrs-test-3refapp/package.json).

Tests might be timed out on slow internet connections. In that case, try increasing the `defaultCommandTimeout` setting in the 'cypress.json' file.


## File structure
```
.
├── cypress
│   ├── fixtures // Test fixtures (e.g. attachments)
│   │   └── test_image.jpeg
│   ├── integration
│   │   └── cucumber
│   │       └── step_definitions
│   │           └── refapp-3.x // Cypress tests for the refapp 3.x
│   │               ├── 01-login
│   │               │   └── login.js
│   │               ...
│   ├── plugins
│   │   └── index.js
│   ├── support
│   │   ├── commands.js // Custom commands for Cypress
│   │   └── index.js
│   ├── videos  // Screen recordings (set "video": true in cypress.json)
│   └── tsconfig.json
├── resources
│   ├── features
│   │   └── refapp-3.x // Cucumber feature files for the refapp 3.x
│   │       ├── 01-login
│   │       │   └── login.feature
│   │       ...
├── README.md
├── cypress.json // Cypress configuration file
├── package.json
```


## Writing a new test

Given that you are inside the `/packages/cypress` directory:

1. Create a new directory with your feature file under `/resources/features/refapp-3.x/`.

   The name of the directory should be `<sequence>-<name>`.

   [Example of a feature file](https://github.com/openmrs/openmrs-contrib-qaframework/blob/master/qaframework-bdd-tests/src/test/resources/features/refapp-2.x/stylesGuide.feature)

2. Create a new directory with the same name under  `cypress/integration/cucumber/step_definitions/refapp-3.x/` to store the step definition file.
   See the [cypress-cucumber-preprocessor docs](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor#readme)

3. Run the test using either:
    - Command line: `cypress run --spec <path-to-feature-file>`

      (You can simplify the command by adding it to the yarn scripts section. See [this example](https://github.com/openmrs/openmrs-contrib-qaframework/blob/f9996d757912ba7ccfb1ff3495379bbafaf89f23/package.json#L19).)
    - Cypress runner: `cypress open` and choose the test


## Environment variables

The environment variables are stored in the `cypress.json` file. The variables can be accessed with `Cypress.env()`; e.g.,
```typescript
Cypress.env('API_BASE_URL');
```

See the [Cypress docs](https://docs.cypress.io/guides/guides/environment-variables).
