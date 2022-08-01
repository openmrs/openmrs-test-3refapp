import {Given} from 'cypress-cucumber-preprocessor/steps';

let patient_uuid = null;

beforeEach("Restore Database",() => {
    //Run the script using npm
    cy.exec("bash scripts/resetDB.sh")
})

before({tags: '@patient-involved'}, () => {
    cy.createPatient().then((user) => {
        patient_uuid = user.uuid;
    });
})

Given('the user login to the Outpatient Clinic', () => {    
    cy.on('uncaught:exception', (err, runnable) => {
    	console.log(err);
    	return false;
    });
    cy.login();
    cy.visit('home');
})

When('the user search for {string}', patientName => {
    cy.get('button[name=SearchPatientIcon]').click();
    cy.getByPlaceholder('Search for a patient by name or identifier number').type(patientName);
    // Adding an artificial wait because typed texts takes some time to get updated
    cy.wait(1000);
    cy.getByPlaceholder('Search for a patient by name or identifier number').type('{enter}');
})

Then('the result should be {string}', result => {
    cy.contains(result);
    
});

after({tags: '@patient-involved'}, () => {
    cy.deletePatient(patient_uuid);
});

