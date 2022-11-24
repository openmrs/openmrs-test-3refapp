import {Given, Before} from '@badeball/cypress-cucumber-preprocessor';

Before(() => {
    cy.log("Resetting the database")
    cy.exec("bash scripts/resetDB.sh");
});

Given('the user login to the Outpatient Clinic', () => {
    cy.on('uncaught:exception', (err, runnable) => {
        return false;
    });
    cy.login();
});

Given('the user visit the home page', () => {
    cy.visit('home');
});
