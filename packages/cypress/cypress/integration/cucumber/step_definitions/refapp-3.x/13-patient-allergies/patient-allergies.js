import { Then, When} from '@badeball/cypress-cucumber-preprocessor';

When("the user clicks on Allergies tab", () => {
  cy.contains("Allergies").click({ force: true });
});

Then("the empty allergies section should be displayed", () => {
  cy.contains("There are no allergy intolerances to display for this patient");
});

// TODO: Record allergies
