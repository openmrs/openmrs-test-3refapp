import { Given, Before, When } from "cypress-cucumber-preprocessor/steps";

let identifier = null;
let patient = null;

Before({ tags: "@care-programs" }, () => {
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

When("the user clicks on Programs tab", () => {
  cy.contains("Programs").click({ force: true });
});

Then("the Care Programs section should display", () => {
  cy.contains("Care Programs");
});

When("the user clicks on Record program enrollments", () => {
  cy.contains("program enrollments").click({ force: true });
});

Then("the Record program enrollment section should display", () => {
  cy.contains("Record program enrollment");
});

When("the user enroll to a program", () => {
  cy.contains("Choose a program").click({ force: true });
  cy.wait(1000);
  cy.contains("HIV Care and Treatment").click({ force: true });
  // TODO: Different dates
  cy.contains("Save and close").click({force:true});
});

Then("the visit should end successfully", () => {
  cy.contains("Program enrollment saved");
});
