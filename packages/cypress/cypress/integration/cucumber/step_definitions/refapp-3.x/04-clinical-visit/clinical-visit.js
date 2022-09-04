import {Given, When} from 'cypress-cucumber-preprocessor/steps';

let patient = null;

before({tags: '@clinical-visit'}, () => {
    cy.createPatient().then((generatedPatient) => {
        patient = generatedPatient;
        cy.startFacilityVisit(patient.uuid);
        cy.generateLabResults(patient.uuid);
    });
});

Given('the user is logged in', () => {    
    cy.on('uncaught:exception', (err, runnable) => {
    	console.log(err);
    	return false;
    });
    cy.login();
})

Given('the user arrives on a patient’s chart page', () => {
    cy.visit(`patient/${patient.uuid}/chart`);
});

Then('the Patient header should display correct information', () => {
    cy.contains(patient.person.display);
    cy.contains(patient.person.age);
    cy.contains(patient.person.gender === 'M' ? 'Male' : 'Female');
});

Then('the user should be able to expand header to see more information', () => {
    cy.contains('Show all details').click({force: true});
    cy.contains('Address');
});

Then('the Patient Summary should load properly', () => {
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

When('the user clicks on {string} button', (actions) => {
    cy.contains(actions).click({force: true});
});

And('user selects {string}', (visitOption) => {
    cy.contains(visitOption).click({force: true});
});

Then('the user starts a vist', () => {
    cy.get('input[id="visitStartDateInput"]').type('01/09/2022', {force: true});
    cy.get('input[id="visitStartTime"]').type('05:12', {force: true});
    cy.get('#visitStartTimeSelect').select('PM');
    cy.get('#location').select('Outpatient Clinic');
    cy.get('section [type="radio"]').check('Facility Visit')
    cy.get('button[type="submit"').click({force: true});
});

Then('Visit should be saved and started', () => {
    cy.contains('Visit started');
    cy.reload();
    cy.get('div[data-extension-slot-name="patient-header-slot"]').contains('Active Visit');
});

Then('the user edits a vist', () => {
    cy.get('input[id="visitStartDateInput"]').type('20/07/2022', {force: true});
    cy.get('input[id="visitStartTime"]').type('06:10', {force: true});
    cy.get('#visitStartTimeSelect').select('AM');
    cy.get('#location').select('Outpatient Clinic');
    cy.get('section [type="radio"]').check('Facility Visit')
    cy.get('button[type="submit"').click({force: true});
});

Then('the user clicks on Edit past Visit', () => {
    cy.window().then((win) => {
        cy.contains('Edit Past Visit').click({force: true});
    })
});

And('the user selects Edit', () => {
    cy.get("aside table tbody tr").first().focus()
    cy.contains('...').click({force: true});
    cy.contains('Edit').click({force: true});
    cy.window().then((win) => {
        cy.contains('Open anyway').click({force: true});
    })
});

after({tags: '@clinical-visit'}, () => {
    cy.deletePatient(patient.uuid);
});