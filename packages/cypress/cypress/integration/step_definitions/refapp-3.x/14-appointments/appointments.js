describe('Appointments Test', () => {

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

  describe('The users should be able to make an appointment', () => {
    it("a user clicks on Appointments tab", () => {
      cy.get('div[data-extension-slot-name="patient-chart-dashboard-slot"]').contains('Appointments').click({ force: true });
    });

    it("the empty upcoming appointment table should displayed", () => {
      cy.contains("There are no appointments scheduled for today to display for this patient");
    });

    it("the user clicks on past appointments section", () => {
      cy.contains("Past").click();
    });

    it("the empty past appointment table should displayed", () => {
      cy.contains("There are no past appointments to display for this patient");
    });
  });
});

//ToDo: requests an appointment
