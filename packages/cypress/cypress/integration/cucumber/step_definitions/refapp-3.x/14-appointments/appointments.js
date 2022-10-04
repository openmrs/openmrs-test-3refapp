import { Before, Then, When, After } from '@badeball/cypress-cucumber-preprocessor';

let patient = null;

Before({tags: '@appointments' }, () => {
  cy.createPatient().then((generatedPatient) => {
    patient = generatedPatient;
  });
});

When("a user clicks on Appointments tab", () => {
  cy.get('div[data-extension-slot-name="patient-chart-dashboard-slot"]').contains('Appointments').click({ force: true });
});

Then("the empty upcoming appointment table should displayed", () => {
  cy.contains("There are no upcoming appointments to display for this patient");
});

When("the user clicks on past appointments section", () => {
  cy.contains("Past").click();
});

Then("the empty past appointment table should displayed", () => {
  cy.contains("There are no past appointments to display for this patient");
});

After({tags: '@appointments'}, () => {
  cy.deletePatient(patient.uuid);
});

//ToDo: requests an appointment
