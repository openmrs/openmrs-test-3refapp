import {Before, Then, When, After} from '@badeball/cypress-cucumber-preprocessor';

let patient = null;

Before({tags: '@patient-search' }, () => {
  cy.createPatient().then((generatedPatient) => {
    patient = generatedPatient;
  });
});

When('the user search for {string}', patientName => {
    cy.get('button[name=SearchPatientIcon]').click();
    cy.getByPlaceholder('Search for a patient by name or identifier number').type(patientName);
    // Adding an artificial wait because typed texts takes some time to get updated
    cy.wait(1000);
    cy.getByPlaceholder('Search for a patient by name or identifier number').type('{enter}');
})

Then('the result should be {string}', result => {
    cy.contains(result);
});

After({tags: '@patient-search'}, () => {
    cy.deletePatient(patient.uuid);
});
