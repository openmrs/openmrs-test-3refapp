import {Given} from 'cypress-cucumber-preprocessor/steps';

Given('the user login to the Outpatient Clinic', () => {
    cy.login();
    cy.visit('home');
})

When('the user logout from the application', () => {
    cy.get('button[name=Users]').click();
    cy.get('button[role=button]').click();
})

Then('the user should be redirect to the login page', () => {
    cy.url().should('include', '/login');
});
