describe('Form Management Test', () => {
  
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

  describe('Users should be able to manage the submitted forms and add forms', () => {
    it("the user clicks on Forms & Notes tab", () => {
      cy.contains("Forms & Notes").click({force: true});
    });
  
    it('the form table should displayed', () => {
        cy.contains("Test Form 1");
    });
  })
});

//TODO: Form management section is still under development.
//TODO: Form management test should be expand after the developments are over
