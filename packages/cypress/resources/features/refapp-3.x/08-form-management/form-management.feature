Feature: User Logout

  Background:
    Given the user login to the Outpatient Clinic
    And the user arrives on a patient’s summary page

  @form-management
  Scenario: form entry widget loads & displays all expected forms
    When the user clicks on Forms & Notes tab
    Then form entry widget loads & displays all expected forms
