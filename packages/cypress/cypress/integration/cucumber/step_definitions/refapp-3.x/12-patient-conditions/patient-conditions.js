import { Given, Before, When } from "cypress-cucumber-preprocessor/steps";

let identifier = null;
let patient = null;

Before({ tags: "@patient-conditions" }, () => {
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

When("the user clicks on Conditions tab", () => {
  cy.contains("Conditions").click({ force: true });
});

Then("the empty Conditions page should display", () => {
  cy.contains("There are no conditions to display for this patient");
});

When("the user record a condition", () => {
  cy.contains("Record conditions").click({force:true});
  cy.getByPlaceholder('Search conditions').type("HIV resulting");
  cy.contains("HIV resulting in other conditions").click({force:true});
  cy.get('button[type=submit]').click();
});

Then("the condition should record successfully", () => {
  cy.contains("Condition saved");
});
