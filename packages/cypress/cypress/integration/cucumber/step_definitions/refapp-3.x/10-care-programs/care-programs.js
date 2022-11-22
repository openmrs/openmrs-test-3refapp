import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

let patient = null;

When('the user arrives on a patient’s chart page', () => {
  cy.createPatient().then((generatedPatient) => {
    patient = generatedPatient;
    cy.visit(`patient/${patient.uuid}/chart`);
  });
});

When("the user clicks on Programs tab", () => {
  cy.contains("Programs").click({ force: true });
});

Then("the Care Programs section should display", () => {
  cy.contains("Care Programs");
});

When("the user clicks on Record program enrollments", () => {
  cy.contains("program enrollments").click({ force: true });
});

Then("the Record program enrollment section should display", () => {
  cy.contains("Record program enrollment");
});

When("the user enroll to a program", () => {
  cy.contains("Record program enrollment").click({force:true});
  cy.get('#program').select('HIV Care and Treatment');
  // TODO: Different dates
  cy.get('button[type="submit"]').click();
});

Then("the patient should enrolled to the program", () => {
  cy.contains("Program enrollment saved");
});
