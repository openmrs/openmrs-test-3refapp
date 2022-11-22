import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

let patient = null;

When('the user arrives on a patient’s chart page', () => {
  cy.createPatient().then((generatedPatient) => {
    patient = generatedPatient;
    cy.visit(`patient/${patient.uuid}/chart`);
  });
});

When("the user clicks on Record Vitals and Biometrics", () => {
  cy.contains("Vitals & Biometrics").click({ force: true });
  cy.contains("Record biometrics").click({force:true});
});

Then("the Vitals form should load", () => {
  cy.contains("Record Vitals and Biometrics");
});

When("the user adds vitals", () => {
  cy.get("#systolic").type("120", { force: true });
  cy.get("#diastolic").type("80", { force: true });
  cy.get("#Pulse").type("80", { force: true });
  cy.get("#Notes").type("This is a note", { force: true });
  cy.get("input[name='Oxygen Saturation']").type("90", { force: true });
  cy.get("input[name='Respiration Rate']").type("15", { force: true });
  cy.get("#Temperature").type("38", { force: true });
  cy.get("#Height").type("160", { force: true });
  cy.get("#Weight").type("60", { force: true });
  cy.get("#MUAC").type("100", { force: true });
});

When("the user saves the form", () => {
  cy.contains("Save and close").click({ force: true });
  cy.reload();
});

Then("the vitals needs to be displayed on the Vitals table", () => {
  cy.contains("Vitals & Biometrics").click({ force: true });
  cy.contains("160");
  cy.contains("60");
  cy.contains("23.4");
});
