import {Given} from 'cypress-cucumber-preprocessor/steps';

let identifier = null;
let patient = null;

before({ tags: "@form-management" }, () => {
  cy.generateIdentifier().then((generatedIdentifier) => {
    identifier = generatedIdentifier;
    cy.createPatient(identifier).then((generatedPatient) => {
      patient = generatedPatient;
    });
  });
});

Given("the user login to the Outpatient Clinic", () => {
  cy.login();
});

Given("the user arrives on a patient’s summary page", () => {
  cy.visit(`patient/${patient.uuid}/chart`);
});

When("the user clicks on Forms & Notes tab", () => {
  cy.contains("Forms & Notes").click({force: true});
});

Then('the empty form table should displayed', () => {
    cy.contains("There are no Forms to display for this patient");
    //TODO: Form management section is still under development.
    //TODO: Form management test should be expand after the developments are over
});
