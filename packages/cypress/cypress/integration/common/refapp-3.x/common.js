import {Given, And} from '@badeball/cypress-cucumber-preprocessor';

Given('the user login to the Outpatient Clinic', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });
      cy.login();
      cy.visit('home');
  })
  
And('the user arrives on a patient’s chart page', () => {
    cy.get('button[name=SearchPatientIcon]').click();
    cy.getByPlaceholder('Search for a patient by name or identifier number').type('John Doe')
    cy.contains('John Doe').first().click({force: true});
});
