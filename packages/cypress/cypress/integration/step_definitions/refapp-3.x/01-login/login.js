describe('Login Test', () => {

    before(() => {
        cy.log("Resetting the database")
        cy.exec("bash scripts/resetDB.sh");
    });
    
    describe('User login to the dashboard', () => {
        it('user arrives at the login page', () => {
            cy.visit('/login');
        })

        const loginCases = [
            {username: "admin", password: "Admin123", location: "Outpatient Clinic", ability: "able"},
            {username: "wrong user", password: "Admin123", location: "Outpatient Clinic", ability: "unable"},
            {username: "admin", password: "wrong pass", location: "Outpatient Clinic", ability: "unable"}
        ]
        loginCases.forEach( loginCase => {
            it(`the user logs in with ${loginCase.username} and  ${loginCase.password} to the ${loginCase.location}`, () => {
                cy.getByLabel('Username').type(loginCase.username)
                cy.contains('Continue').click({force: true});
                cy.getByLabel('Password').type(loginCase.password)
                cy.contains('Log in').click({force: true});
                // The user will be redirected to the location selection page if the credentials are correct.
                // The following artificial wait is to wait until it changes the url.
                cy.wait(2000);
                // If the url includes "/location" that means the user is on the location selection page. If so, pick the location.
                cy.url().then(($url) => {
                    if($url.includes("/location")) {
                        cy.contains(loginCase.location).click({force: true});
                        cy.contains('Confirm').click({force: true});
                    }
                })
            })

            it(`the user should be ${loginCase.ability} to login`, () => {
                switch (loginCase.ability) {
                    case "able":
                        cy.url().should('include', '/home');
                        break;
                    case "unable":
                        cy.contains("Invalid username or password");
                        break;
                    default:
                        throw new Error(`Ability '${loginCase.ability}' is not supported`);
                }
            });
        });
    });
});
