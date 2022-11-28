describe('Login Test', () => {

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

        it('the user visit the home page', () => {
            cy.visit('home');
        });
    });

    describe('user logout successfully from the application', () => {
        it('the user logout from the application', () => {
            cy.get('button[name=Users]').click();
            cy.get('button[role=button]').click();
        })

        it('the user should be redirect to the login page', () => {
            cy.url().should('include', '/login');
        });
    });
});
