import {Given, And} from '@badeball/cypress-cucumber-preprocessor';

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
