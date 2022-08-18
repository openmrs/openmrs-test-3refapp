import { Given, Before, When } from "cypress-cucumber-preprocessor/steps";

let identifier = null;
let patient = null;

Before({ tags: "@patient-medications" }, () => {
  cy.generateIdentifier().then((generatedIdentifier) => {
    identifier = generatedIdentifier;
    cy.createPatient(identifier).then((generatedPatient) => {
      patient = generatedPatient;
    });
  });
});

Given("the user is logged in", () => {
  cy.login();
});

Given("the user arrives on a patient’s summary page", () => {
  cy.visit(`patient/${patient.uuid}/chart`);
});

When("the user clicks on Orders tab", () => {
  cy.contains("Orders").click({ force: true });
});

Then("the empty orders page should display", () => {
  cy.contains("Your basket is empty");
  cy.contains("There are no active medications to display for this patient");
});

//TODO: Place drug orders (Still on development)
