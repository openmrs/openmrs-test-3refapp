import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

let patient = null;

When('the user arrives on a patient’s chart page', () => {
  cy.createPatient().then((generatedPatient) => {
    patient = generatedPatient;
    cy.visit(`patient/${patient.uuid}/chart`);
  });
});

When("the user clicks on Allergies tab", () => {
  cy.contains("Allergies").click({ force: true });
});

Then("the empty allergies section should be displayed", () => {
  cy.contains("There are no allergy intolerances to display for this patient");
});

// TODO: Record allergies
