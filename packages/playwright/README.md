# Playwright Tests

This package contains an E2E test suite using the [Playwright](https://playwright.dev)
framework. It was initially introduced so that the offline features of the OpenMRS
frontend can be tested. Using Cypress was, at the time of introducing Playwright,
not possible due to a [known Cypress issue regarding offline mode simulation](https://github.com/cypress-io/cypress/issues/235).


## Getting Started

Please ensure that you have followed the basic installation guide in the
[root README](./../../README.md).
Once everything is setup, you can navigate to this directory (if not done already)
and run the scripts inside the
[package.json](./package.json) file using yarn:

```sh
# Given that you start in the repository's root:
cd packages/playwright

# Run all playwright tests:
yarn test
```

It is also highly recommended to install the companion VS Code extension:
https://playwright.dev/docs/getting-started-vscode


## Writing New Tests

In general, it is recommended to read through the official [Playwright docs](https://playwright.dev/docs/intro)
before writing new test cases. The project uses the official Playwright test runner and,
generally, follows a very simple project stucture:

```
src
|__ commands
|   ^ Contains "commands" (simple reusable functions) that can be used in test cases/specs.
|__ core
|   ^ Contains code related to the test runner itself, e.g. setting up the custom fixtures.
|     You probably need to touch this infrequently.
|__ fixtures
|   ^ Contains fixtures (https://playwright.dev/docs/test-fixtures) which are used
|     to run reusable setup/teardown tasks, e.g. logging in.
|__ pages
|   ^ Contains page object model classes for interacting with the frontend.
|     See https://playwright.dev/docs/test-pom for details.
|__ specs
    ^ Contains the actual test cases/specs. New tests should be placed in this folder.
```

When you want to write a new test case, start by creating a new spec in `./src/specs`.
Depending on what you want to achieve, you might want to create new fixtures and/or
page object models. To see examples, have a look at the existing code to see how these
different concepts play together.


## Configuration

This is very much underdeveloped/WIP. At the moment, there exists a (git-shared) `.env`
file which can be used for configuring certain test attributes. This is most likely
about to change in the future when the test suite is supposed to be used in, e.g.,
GitHub Actions pipelines. Stay tuned for updates!
