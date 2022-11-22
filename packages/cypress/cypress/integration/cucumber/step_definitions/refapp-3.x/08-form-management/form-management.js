import {Then, When} from '@badeball/cypress-cucumber-preprocessor';

let patient = null;

When('the user arrives on a patient’s chart page', () => {
  cy.createPatient().then((generatedPatient) => {
    patient = generatedPatient;
    cy.visit(`patient/${patient.uuid}/chart`);
  });
});

When("the user clicks on Forms & Notes tab", () => {
  cy.contains("Forms & Notes").click({force: true});
});

Then('the form table should displayed', () => {
    cy.contains("Test Form 1");
});

//TODO: Form management section is still under development.
//TODO: Form management test should be expand after the developments are over
