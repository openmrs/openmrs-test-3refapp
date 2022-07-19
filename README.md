# QA Dashboard for RefApp 3.x: Project Status
___

# RefApp 3.x  E2E tests

| 3.x RefApp Workflow Tests |
|---------------------------|
[3.x Demo Build](https://ci.openmrs.org/browse/REFAPP-D3X) ![Build Status](https://ci.openmrs.org/plugins/servlet/wittified/build-status/REFAPP-D3X)
[![RefApp 3.x Login](https://github.com/openmrs/openmrs-test-3refapp/actions/workflows/refapp-3x-login.yml/badge.svg)](https://github.com/openmrs/openmrs-test-3refapp/actions/workflows/refapp-3x-login.yml)
[![RefApp 3.x Patient Registration](https://github.com/openmrs/openmrs-test-3refapp/actions/workflows/refapp-3x-patient-registration.yml/badge.svg)](https://github.com/openmrs/openmrs-test-3refapp/actions/workflows/refapp-3x-patient-registration.yml)
___


## Setting up the project

1. Clone the project
    ```
     git clone git@github.com:openmrs/openmrs-test-3refapp.git
     cd openmrs-test-3refapp
    ```
2. Install the dependencies
    ```
    npm install
    ```

### Run the local instance

1. Checkout to docker directory
   ```
   cd docker
   ```

2. Run the app
   ```      
   docker-compose -f docker-compose-refqa-3x.yml up
   ```

### If the docker container doesn't work you have to set up the local instance by packaging.

Follow this steps for setting up the local instance
1. Clone the repository
    ```
    git clone -b 3.x git@github.com:openmrs/openmrs-distro-referenceapplication.git
    ```

2. Follow the instruction provided by the [readme](https://github.com/openmrs/openmrs-distro-referenceapplication/tree/3.x/#readme)

* If the build fails, try deleting existing containers
    ```
    docker compose down -v
    ```

## Running tests

There are two ways of running tests:

1. **Running with cypress runner**
   Open the Cypress runner with
    ```
    cypress open
    ```
   and pick a test from the GUI.

2. **Running in command line**

   Run the desired test using `npm run`, e.g.

    ```
    npm run refapp3Login
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
├── docker
│   ├── features
│           └── docker-compose-refqa-3x.yml
├── README.md
├── cypress.json // Cypress configuration file
├── package.json
```


## Writing a new test
1. Create a new directory with your feature file under `/resources/features/refapp-3.x/`.

   The name of the directory should be `<sequence>-<name>`.

   [Example of a feature file](https://github.com/openmrs/openmrs-contrib-qaframework/blob/master/qaframework-bdd-tests/src/test/resources/features/refapp-2.x/stylesGuide.feature)

2. Create a new directory with the same name under  `cypress/integration/cucumber/step_definitions/refapp-3.x/` to store the step definition file.
   See the [cypress-cucumber-preprocessor docs](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor#readme)

3. Run the test using either:
    - Command line: `cypress run --spec <path-to-feature-file>`

      (You can simplify the command by adding it to the npm scripts section. See [this example](https://github.com/openmrs/openmrs-contrib-qaframework/blob/f9996d757912ba7ccfb1ff3495379bbafaf89f23/package.json#L19).)
    - Cypress runner: `cypress open` and choose the test

## Creating a GitHub workflow
1. Create a new GitHub workflow file under `.github/workflows/` directory. An example workflow can be found [here](https://github.com/openmrs/openmrs-contrib-qaframework/blob/master/.github/workflows/refapp-3x-login.yml).
2. Add the workflow badge to the readme file under [3.x RefApp](https://github.com/openmrs/openmrs-contrib-qaframework/blob/master/README.md#3x-refapp) section. It should take the following format:
    ```markdown
    [![<workflow name>](<link-to-the-workflow>/badge.svg)](<link-to-the-workflow>)
    ```

## Environment variables

The environment variables are stored in the `cypress.json` file. The variables can be accessed with `Cypress.env()`; e.g.,
```typescript
Cypress.env('API_BASE_URL');
```

See the [Cypress docs](https://docs.cypress.io/guides/guides/environment-variables).


## Before Releasing
- [ ] For the platform, manually run both Installation and upgrade workflows again.
- [ ] Check all relevant builds to the release above to be sure they pass


## Wiki
* We use JIRA to track issues and monitor project development. Refer to this link to view all issues and project summary: [QA Kanban board JIRA](https://issues.openmrs.org/secure/RapidBoard.jspa?rapidView=240).

* To get started contributing, start working on introductory issues in JIRA and check out  [OpenMRS Pull Request Tips](https://wiki.openmrs.org/display/docs/Pull+Request+Tips).

* There is a detailed guide for setting up the OpenMRS QA Framework locally, checkout the guide [here](https://wiki.openmrs.org/pages/viewpage.action?pageId=235277297).
