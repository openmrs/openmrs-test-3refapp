import { Before, Then, When, After } from '@badeball/cypress-cucumber-preprocessor';

let patient = null;

Before({tags: '@form-management' }, () => {
  cy.createPatient().then((generatedPatient) => {
    patient = generatedPatient;
  });
});

When("the user clicks on Forms & Notes tab", () => {
  cy.contains("Forms & Notes").click({force: true});
});

Then('the form table should displayed', () => {
    cy.contains("Test Form 1");
});

After({tags: '@form-management'}, () => {
  cy.deletePatient(patient.uuid);
});

//TODO: Form management section is still under development.
//TODO: Form management test should be expand after the developments are over
