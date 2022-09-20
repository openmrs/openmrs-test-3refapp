import { Then, When} from '@badeball/cypress-cucumber-preprocessor';

When("a user clicks on Appointments tab", () => {
  cy.contains("Appointments").click({ force: true });
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

//ToDo: requests an appointment
