describe('Patient Conditions Test', () => {
    
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

  describe('The user add a care program and enroll patient', () => {
    it("the user clicks on Conditions tab", () => {
      cy.contains("Conditions").click({ force: true });
    });

    it("the empty Conditions page should display", () => {
      cy.contains("There are no conditions to display for this patient");
    });

    it("the user record a condition", () => {
      cy.contains("Record conditions").click({force:true});
      cy.getByPlaceholder('Search conditions').type("HIV resulting");
      cy.contains("HIV resulting in other conditions").click({force:true});
      cy.get('button[type=submit]').click();
    });

    it("the condition should record successfully", () => {
      cy.contains("Condition saved");
    });
  });
});
