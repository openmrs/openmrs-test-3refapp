import {Then, When} from '@badeball/cypress-cucumber-preprocessor';

When('the user logout from the application', () => {
    cy.get('button[name=Users]').click();
    cy.get('button[role=button]').click();
})

Then('the user should be redirect to the login page', () => {
    cy.url().should('include', '/login');
});
