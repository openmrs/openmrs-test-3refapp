import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

let patient = null;

When('the user arrives on a patient’s chart page', () => {
  cy.createPatient().then((generatedPatient) => {
    patient = generatedPatient;
    cy.visit(`patient/${patient.uuid}/chart`);
  });
});

When("a user clicks on Appointments tab", () => {
  cy.get('div[data-extension-slot-name="patient-chart-dashboard-slot"]').contains('Appointments').click({ force: true });
});

Then("the empty upcoming appointment table should displayed", () => {
  cy.contains("There are no appointments scheduled for today to display for this patient");
});

When("the user clicks on past appointments section", () => {
  cy.contains("Past").click();
});

Then("the empty past appointment table should displayed", () => {
  cy.contains("There are no past appointments to display for this patient");
});

//ToDo: requests an appointment
