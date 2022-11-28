describe('Clinical Vist Test', () => {

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
    });

    describe('The Patient Chart should load properly', () => {
        it('the Patient header should display correct information', () => {
            cy.contains(patient.person.display);
            cy.contains(patient.person.age);
            cy.contains(patient.person.gender === 'M' ? 'Male' : 'Female');
        });

        it('the user should be able to expand header to see more information', () => {
            cy.contains('Show all details').click();
            cy.contains('Address');
        });
    });

    it('the Patient Summary should load properly', () => {
        cy.get('div[data-extension-slot-name="patient-chart-dashboard-slot"]').contains('Patient Summary');
        cy.get('div[data-extension-slot-name="patient-chart-dashboard-slot"]').contains('Vitals & Biometrics');
        cy.get('div[data-extension-slot-name="patient-chart-dashboard-slot"]').contains('Orders');
        cy.get('div[data-extension-slot-name="patient-chart-dashboard-slot"]').contains('Test Results');
        cy.get('div[data-extension-slot-name="patient-chart-dashboard-slot"]').contains('Visits');
        cy.get('div[data-extension-slot-name="patient-chart-dashboard-slot"]').contains('Allergies');
        cy.get('div[data-extension-slot-name="patient-chart-dashboard-slot"]').contains('Conditions');
        cy.get('div[data-extension-slot-name="patient-chart-dashboard-slot"]').contains('Immunizations');
        cy.get('div[data-extension-slot-name="patient-chart-dashboard-slot"]').contains('Attachments');
        cy.get('div[data-extension-slot-name="patient-chart-dashboard-slot"]').contains('Programs');
        cy.get('div[data-extension-slot-name="patient-chart-dashboard-slot"]').contains('Appointments');
        cy.get('div[data-extension-slot-name="patient-chart-dashboard-slot"]').contains('Forms & Notes');
        cy.get('div[data-extension-slot-name="patient-chart-dashboard-slot"]').contains('Offline actions');
    });

    describe('User should be able to start a visit', () => {
        it('the user arrives on a patient’s chart page', () => {
            cy.createPatient().then((generatedPatient) => {
                patient = generatedPatient;
                cy.visit(`patient/${patient.uuid}/chart`);
            });
        });

        it('user selects "Start visit"', (visitOption = "Start visit") => {
            cy.contains(visitOption).click();
        });

        it('the user starts a visit', () => {
            cy.get('input[id="visitStartDateInput"]').type('01/09/2022', );
            cy.get('input[id="visitStartTime"]').type('05:12', );
            cy.get('#visitStartTimeSelect').select('PM');
            cy.get('#location').select('Outpatient Clinic');
            cy.contains('Facility Visit').click();
            cy.get('button[type="submit"').click();
        });

        it('Visit should be saved and started', () => {
            cy.get('div[data-extension-slot-name="patient-banner-tags-slot"]').contains('Active Visit');
        });
    })    
    
    describe('User should be able to end a visit', () => {

        it('the user arrives on a patient chart page of a patient with an active visit', () => {
            cy.createPatient().then((generatedPatient) => {
                patient = generatedPatient;
                cy.startFacilityVisit(patient.uuid).then(()=>{
                    cy.visit(`patient/${patient.uuid}/chart`);
                });
            });
        });

        it('the user clicks on Actions button', () => {
            cy.get('div[role="banner"]').contains("Actions").click();
        });

        it('user selects "Cancel visit"', (visitOption = "Cancel visit") => {
            cy.contains(visitOption).click();
        });

        it('the user confirm cancellation', () => {
            cy.get('.omrs-modals-container').contains('Cancel Visit').click();
        });
        
        it('the visit should have ended', () => {
            cy.get('div[data-extension-slot-name="patient-banner-tags-slot"]').contains('Active Visit').should('not.exist');
        });
    })
});

