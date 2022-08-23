import {Given} from 'cypress-cucumber-preprocessor/steps';

let identifier = null;
let patient = null;

before({tags: "@patient-allergies"}, () => {
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

When("the user clicks on Allergies tab", () => {
  cy.contains("Allergies").click({force: true});
});

Then('the empty allergies section should be displayed', () => {
  cy.contains("There are no allergy intolerances to display for this patient");
  //TODO: Allergies intolerances section is still under development.
  //TODO: Record allergies intolerances test should be expand after the developments are over
});
