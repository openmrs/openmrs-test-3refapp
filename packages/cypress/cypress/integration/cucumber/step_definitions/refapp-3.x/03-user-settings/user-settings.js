import {After, And, Then, When} from '@badeball/cypress-cucumber-preprocessor';

When('the user change the locale to Spanish', () => {
    cy.get('button[name="Users"]').click({force: true});
    cy.getByLabel('Select locale').select('es');
    cy.wait(2000);
});

And("user clicks on patient search option", () => {
  cy.get('button[name="Users"]').click();
  cy.get('button[name=SearchPatientIcon]').click();
});

Then('the text should change into spanish', () => {
  cy.getByPlaceholder('Buscar un paciente');
});

When('the user clicks on the users icon', () => {
    cy.get('button[name="Users"]').click();
});

Then('the current location should be there', () => {
    const defaultLocation = Cypress.env('DEFAULT_LOCATION_NAME');
    cy.get('div[data-extension-id=location-changer]').contains(defaultLocation);
});

When('the user change the location to {string}', (location) => {
    cy.get('div[data-extension-id=location-changer]').contains('Change').click({force: true})
    cy.contains(location).click({force: true});
    cy.contains('Confirm').click({force: true});
});

Then('the user should be on the home page', () => {
    cy.url().should('include', `home`);
});

Then('the current location should be {string}', (location) => {
    cy.get('button[name="Users"]').click();
    cy.get('div[data-extension-id=location-changer]').contains(location);
});

const changeLocale = (locale) => {
  const apiUrl = Cypress.env('API_BASE_URL');
  const username = Cypress.env('ADMIN_USERNAME');
  const uuid = Cypress.env('ADMIN_UUID');
  const password = Cypress.env('ADMIN_PASSWORD');
  const token = window.btoa(`${username}:${password}`);
  cy.request({
    method: 'POST',
    url: `${apiUrl}/user/${uuid}`,
    body: {
      userProperties: {
        defaultLocale: locale,
      }
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${token}`,
    },
  });
};

After({tags: '@locale'}, () => {
  changeLocale('en');
});
