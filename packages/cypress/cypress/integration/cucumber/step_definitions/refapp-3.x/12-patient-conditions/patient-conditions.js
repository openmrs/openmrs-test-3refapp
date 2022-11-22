import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

let patient = null;

When('the user arrives on a patient’s chart page', () => {
  cy.createPatient().then((generatedPatient) => {
    patient = generatedPatient;
    cy.visit(`patient/${patient.uuid}/chart`);
  });
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
