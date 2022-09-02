import { Given } from "cypress-cucumber-preprocessor/steps";

let identifier = null;
let patient = null;

before({ tags: "@appointments" }, () => {
  cy.generateIdentifier().then((generatedIdentifier) => {
    identifier = generatedIdentifier;
    cy.createPatient(identifier).then((generatedPatient) => {
      patient = generatedPatient;
    });
  });
});

Given("the user is logged in", () => {
  cy.login();
});

Given("the user arrives on a patient’s summary page", () => {
  cy.visit(`patient/${patient.uuid}/chart`);
});

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
