import { Before, Then, When, After } from '@badeball/cypress-cucumber-preprocessor';

let patient = null;

Before({tags: '@care-programs' }, () => {
  cy.createPatient().then((generatedPatient) => {
    patient = generatedPatient;
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

After({tags: '@care-programs'}, () => {
  cy.deletePatient(patient.uuid);
});
