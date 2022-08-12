import {Given} from 'cypress-cucumber-preprocessor/steps';

Given('the user login to the Outpatient Clinic', () => {
    cy.login();
    cy.visit('home');
})

When('a user click on forms section', () => {
    cy.contains("App Menu").click({force: true});
    cy.contains("Forms").click({force: true});
})

Then('form entry widget loads & displays all expected forms', () => {
    cy.contains("POC Covid Lab Test");
});
