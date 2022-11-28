describe('Patient Allergies Test', () => {

  let patient = null;

  before(() => {
    cy.log("Resetting the database")
    cy.exec("bash scripts/resetDB.sh");
  });

  describe('Background', () => {
      it('the user login to the Outpatient Clinic', () => {
          cy.on('uncaught:exception', (err, runnable) => {
              return false;
          });
          cy.login();
      });

      it('the user arrives on a patient’s chart page', () => {
        cy.createPatient().then((generatedPatient) => {
          patient = generatedPatient;
          cy.visit(`patient/${patient.uuid}/chart`);
        });
      });
  });

  describe('Users are able to view all recorded allergies and record a new allergy', () => {
    it("the user clicks on Allergies tab", () => {
      cy.contains("Allergies").click({ force: true });
    });

    it("the empty allergies section should be displayed", () => {
      cy.contains("There are no allergy intolerances to display for this patient");
    });
  });
});

// TODO: Record allergies
