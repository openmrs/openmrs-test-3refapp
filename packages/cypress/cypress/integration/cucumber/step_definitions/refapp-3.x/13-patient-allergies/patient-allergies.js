import { Before, Then, When, After } from '@badeball/cypress-cucumber-preprocessor';

let patient = null;

Before({tags: '@patient-allergies' }, () => {
  cy.createPatient().then((generatedPatient) => {
    patient = generatedPatient;
  });
});

When("the user clicks on Allergies tab", () => {
  cy.contains("Allergies").click({ force: true });
});

Then("the empty allergies section should be displayed", () => {
  cy.contains("There are no allergy intolerances to display for this patient");
});

After({tags: '@patient-allergies'}, () => {
  cy.deletePatient(patient.uuid);
});

// TODO: Record allergies
