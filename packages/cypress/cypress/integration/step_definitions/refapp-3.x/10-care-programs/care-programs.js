describe('Care Programs Test', () => {

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
    it("the user clicks on Programs tab", () => {
      cy.contains("Programs").click({ force: true });
    });

    it("the Care Programs section should display", () => {
      cy.contains("Care Programs");
    });

    it("the user clicks on Record program enrollments", () => {
      cy.contains("program enrollments").click({ force: true });
    });

    it("the Record program enrollment section should display", () => {
      cy.contains("Record program enrollment");
    });

    it("the user enroll to a program", () => {
      cy.contains("Record program enrollment").click({force:true});
      cy.get('#program').select('HIV Care and Treatment');
      // TODO: Different dates
      cy.get('button[type="submit"]').click();
    });

    it("the patient should enrolled to the program", () => {
      cy.contains("Program enrollment saved");
    });
  });
});
