import { Given, Before, When } from "cypress-cucumber-preprocessor/steps";

let identifier = null;
let patient = null;

Before({ tags: "@patient-visit-start" }, () => {
  cy.generateIdentifier().then((generatedIdentifier) => {
    identifier = generatedIdentifier;
    cy.createPatient(identifier).then((generatedPatient) => {
      patient = generatedPatient;
    });
  });
});

Before({ tags: "@patient-visit-end" }, () => {
  cy.generateIdentifier().then((generatedIdentifier) => {
    identifier = generatedIdentifier;
    cy.createPatient(identifier).then((generatedPatient) => {
      patient = generatedPatient;
      cy.startFacilityVisit(patient.uuid);
    });
  });
});

Given("the user is logged in", () => {
  cy.login();
});

Given("the user arrives on a patient’s summary page", () => {
  cy.visit(`patient/${patient.uuid}/chart`);
});

When("the user clicks on Start visit", () => {
  cy.contains("Actions").click({ force: true });
  cy.contains("Start visit").click({ force: true });
});

Then("the start a visit page should load", () => {
  cy.contains("Start a visit");
});

When("the user add the details and submit", () => {
  cy.contains("Facility Visit").click({ force: true });
  // Todo: Extend test on other visit types
  cy.wait(1000);
  // cy.contains("Start visit").click({force:true})
  cy.get('button[type=submit]').click();
});

Then("the visit should be started", () => {
  cy.contains("Visit started");
});

When("the user ends the clinical visit", () => {
  cy.contains("Actions").click({ force: true });
  cy.contains("End visit").click({ force: true });
  cy.wait(1000);
  cy.contains("End Visit").click({force:true});
});

Then("the visit should end successfully", () => {
  cy.contains("Visit ended");
});

