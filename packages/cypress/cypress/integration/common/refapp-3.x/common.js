import {Given, And, Before} from '@badeball/cypress-cucumber-preprocessor';

Before(() => {
  cy.log("Resetting the database")
  cy.exec("bash scripts/resetDB.sh");
});

Given('the user login to the Outpatient Clinic', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });
      cy.login();
      cy.visit('home');
  })

// And('the user arrives on a patient’s chart page', () => {
//   cy.createPatient().then((generatedPatient) => {
//     cy.visit(`patient/${generatedPatient.uuid}/chart`);
//   });
// });
