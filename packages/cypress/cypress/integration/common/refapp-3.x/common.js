import {Given, Before, After, And} from '@badeball/cypress-cucumber-preprocessor';

let identifier = null;
let patient = null;

Before({tags: '@vitals-and-biometrics or @patient-search or @form-management or @care-programs or @patient-conditions or @patient-allergies or @appointments' }, () => {
  cy.generateIdentifier().then((generatedIdentifier) => {
    identifier = generatedIdentifier;
    cy.createPatient(identifier).then((generatedPatient) => {
      patient = generatedPatient;
    });
  });
});

Given('the user login to the Outpatient Clinic', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });
      cy.login();
      cy.visit('home');
  })
  
And('the user arrives on a patient’s chart page', () => {
    cy.visit(`patient/${patient.uuid}/chart`);
});

After({tags: '@vitals-and-biometrics or @patient-search or @form-management or @care-programs or @patient-conditions or @patient-allergies or @appointments'}, () => {
    cy.deletePatient(patient.uuid);
});
