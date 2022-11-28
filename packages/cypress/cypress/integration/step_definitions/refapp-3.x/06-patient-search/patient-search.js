describe('Patient Search Test', () => {

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

        it('John Doe is registered on the system', () => {
            cy.createPatient();
        });
        
        it('the user visit the home page', () => {
            cy.visit('home');
        });
    });

    describe('Patient Search Test', () => {
        
        const searchData = [
            ['Harry Potter', 'Harry Potter'],
            ['non existing', 'Sorry, no patient']
        ]

        searchData.forEach( (type) => {
            const [patientName, result] = type;
            it(`the user search for ${patientName}`, () => {
                cy.get('button[name=SearchPatientIcon]').click();
                cy.getByPlaceholder('Search for a patient by name or identifier number').type(patientName);
                // Adding an artificial wait because typed texts takes some time to get updated
                cy.wait(1000);
                cy.getByPlaceholder('Search for a patient by name or identifier number').type('{enter}');
            })

            it(`the result should be ${result}`, () => {
                cy.contains(result);
            });
        });
    })
});
