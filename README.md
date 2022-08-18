# QA Dashboard for RefApp 3.x: Project Status
___

# RefApp 3.x  E2E tests

| 3.x RefApp Workflow Tests |
|---------------------------|
[3.x Demo Build](https://ci.openmrs.org/browse/REFAPP-D3X) ![Build Status](https://ci.openmrs.org/plugins/servlet/wittified/build-status/REFAPP-D3X)
[![RefApp 3.x Login](https://github.com/openmrs/openmrs-test-3refapp/actions/workflows/refapp-3x-login.yml/badge.svg)](https://github.com/openmrs/openmrs-test-3refapp/actions/workflows/refapp-3x-login.yml)
[![RefApp 3.x Logout](https://github.com/openmrs/openmrs-test-3refapp/actions/workflows/refapp-3x-logout.yml/badge.svg)](https://github.com/openmrs/openmrs-test-3refapp/actions/workflows/refapp-3x-logout.yml)
[![RefApp 3.x Patient Registration](https://github.com/openmrs/openmrs-test-3refapp/actions/workflows/refapp-3x-patient-registration.yml/badge.svg)](https://github.com/openmrs/openmrs-test-3refapp/actions/workflows/refapp-3x-patient-registration.yml)
[![RefApp 3.x Vitals and Biometrics](https://github.com/openmrs/openmrs-test-3refapp/actions/workflows/refapp-3x-vitals-and-biometrics.yml/badge.svg)](https://github.com/openmrs/openmrs-test-3refapp/actions/workflows/refapp-3x-vitals-and-biometrics.yml)
[![RefApp 3.x User settings](https://github.com/openmrs/openmrs-test-3refapp/actions/workflows/refapp-3x-user-settings.yml/badge.svg)](https://github.com/openmrs/openmrs-test-3refapp/actions/workflows/refapp-3x-user-settings.yml)
[![RefApp 3.x Patient Search](https://github.com/openmrs/openmrs-test-3refapp/actions/workflows/refapp-3x-patient-search.yml/badge.svg)](https://github.com/openmrs/openmrs-test-3refapp/actions/workflows/refapp-3x-patient-search.yml)
[![RefApp 3.x Patient Conditions](https://github.com/openmrs/openmrs-test-3refapp/actions/workflows/refapp-3x-patient-conditions.yml/badge.svg)](https://github.com/openmrs/openmrs-test-3refapp/actions/workflows/refapp-3x-patient-conditions.yml)
[![RefApp 3.x Form Management](https://github.com/openmrs/openmrs-test-3refapp/actions/workflows/refapp-3x-form-management.yml/badge.svg)](https://github.com/openmrs/openmrs-test-3refapp/actions/workflows/refapp-3x-form-management.yml)
[![RefApp 3.x Patient allergies](https://github.com/openmrs/openmrs-test-3refapp/actions/workflows/refapp-3x-patient-allergies.yml/badge.svg)](https://github.com/openmrs/openmrs-test-3refapp/actions/workflows/refapp-3x-patient-allergies.yml)
[![RefApp 3.x Appointments](https://github.com/openmrs/openmrs-test-3refapp/actions/workflows/refapp-3x-appointments.yml/badge.svg)](https://github.com/openmrs/openmrs-test-3refapp/actions/workflows/refapp-3x-appointments.yml)
[![RefApp 3.x Care Programs](https://github.com/openmrs/openmrs-test-3refapp/actions/workflows/refapp-3x-care-programs.yml/badge.svg)](https://github.com/openmrs/openmrs-test-3refapp/actions/workflows/refapp-3x-care-programs.yml)
[![RefApp 3.x Clinical Visit](https://github.com/openmrs/openmrs-test-3refapp/actions/workflows/refapp-3x-clinical-visit.yml/badge.svg)](https://github.com/openmrs/openmrs-test-3refapp/actions/workflows/refapp-3x-clinical-visit.yml)
[![RefApp 3.x Medications](https://github.com/openmrs/openmrs-test-3refapp/actions/workflows/refapp-3x-medications.yml/badge.svg)](https://github.com/openmrs/openmrs-test-3refapp/actions/workflows/refapp-3x-medications.yml)
___


## Setting up the project

This repository is a monorepo containing two different test projects which leverage
two different test frameworks: Cypress and Playwright.
The reason for the split is that Cypress, at the time of writing this, has a
[known issue](https://github.com/cypress-io/cypress/issues/235) that prevents testing
the offline features that have been introduced to the OpenMRS frontend.
The Playwright framework supports offline mode. Therefore, we use Playwright to
write offline related E2E tests.

To do the basic repository setup:

1. Clone the project
    ```
     git clone git@github.com:openmrs/openmrs-test-3refapp.git
     cd openmrs-test-3refapp
    ```
2. Install the dependencies
    ```
    yarn install
    ```

At this point, you can continue with either the Cypress or the Playwright project.
You can find more details about these two projects here:

* Cypress: [README](./packages/cypress/README.md)
* Playwright: [README](./packages/playwright/README.md)


## Docker

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


## Creating a GitHub workflow
1. Create a new GitHub workflow file under `.github/workflows/` directory. An example workflow can be found [here](https://github.com/openmrs/openmrs-contrib-qaframework/blob/master/.github/workflows/refapp-3x-login.yml).
2. Add the workflow badge to the readme file under [3.x RefApp](https://github.com/openmrs/openmrs-test-3refapp/blob/main/README.md#qa-dashboard-for-refapp-3x-project-status) section. It should take the following format:
    ```markdown
    [![<workflow name>](<link-to-the-workflow>/badge.svg)](<link-to-the-workflow>)
    ```


## Before Releasing
- [ ] For the platform, manually run both Installation and upgrade workflows again.
- [ ] Check all relevant builds to the release above to be sure they pass


## Wiki
* We use JIRA to track issues and monitor project development. Refer to this link to view all issues and project summary: [QA Kanban board JIRA](https://issues.openmrs.org/secure/RapidBoard.jspa?rapidView=240).

* To get started contributing, start working on introductory issues in JIRA and check out  [OpenMRS Pull Request Tips](https://wiki.openmrs.org/display/docs/Pull+Request+Tips).

* There is a detailed guide for setting up the OpenMRS QA Framework locally, checkout the guide [here](https://wiki.openmrs.org/pages/viewpage.action?pageId=235277297).
