import {Given} from 'cypress-cucumber-preprocessor/steps';

Given('the user login to the Outpatient Clinic', () => {
    cy.login();
    cy.visit('home');
})

When('the user clicks on the add patient icon', () => {
    cy.get('button[name=AddPatientIcon]').click();
})

When('the user enters {string} details for Andria Faiza', validity => {
    const details = {
        correct: {
            givenName: 'Andria',
            middleName: 'Kumbha',
            familyName: 'Faiza',
            gender: 'Female',
            address1: '55372,test',
            cityVillage: 'Nairobi',
            stateProvince: 'Nairobi',
            country: 'Kenya',
            postalCode: '00100',
            phone: '+211 34 567890'
        },
        wrong: {
            givenName: null,
            middleName: 'Kumbha',
            familyName: 'Mwangi',
            gender: 'Female',
            address1: null,
            cityVillage: null,
            stateProvince: null,
            country: null,
            postalCode: null,
            phone: null
        }
    };
    // Chek for a valid validity parameter
    if (!details.hasOwnProperty(validity)) {
        throw new Error(`Validity '${validity}' is not supported`);
    }
    const user = details[validity];
    if (user.givenName != null) {
        cy.getByLabel('First Name').type(user.givenName, {force: true});
    }
    if (user.middleName != null) {
        cy.getByLabel('Middle Name').type(user.middleName, {force: true});
    }
    if (user.familyName != null) {
        cy.getByLabel('Family Name').type(user.familyName, {force: true});
    }
    if (user.gender != null) {
        cy.contains(user.gender).click({force: true});
    }
    if (user.address != null) {
        cy.getByLabel('Address Line 1').type(user.address, {force: true});
    }
    if (user.country != null) {
        cy.getByLabel('country').clear({force: true}).type(user.country, {force: true});
    }
    if (user.stateProvince != null) {
        cy.getByLabel('stateProvince').type(user.stateProvince, {force: true});
    }
    if (user.cityVillage != null) {
        cy.getByLabel('cityVillage').type(user.cityVillage, {force: true});
    }
    if (user.postalCode != null) {
        cy.getByLabel('postalCode').type(user.postalCode, {force: true});
    }
    if (user.phoneNumber != null) {
        cy.getByLabel('Phone number(optional)').type(user.phone, {force: true});
    }
    // Click on the first day on the calendar because the calendar doesn't support manual inputs
    cy.getByLabel('Date of Birth').click({force: true});
    cy.get('.dayContainer .flatpickr-day').first().click({force: true});
})

When('the user clicks on the create patient button', () => {
    cy.contains('Register Patient').click({force: true})
})

Then('the patient registration should be {string}', status => {
    switch (status) {
        case 'successful':
            cy.contains('New Patient Created');
            break;
        case 'unsuccessful':
            cy.get('input[aria-invalid="true"]').should('have.length.greaterThan', 0);
            break;
        default:
            throw new Error(`Status '${status}' is not supported`);
    }
})
