Feature: User Logout

  Background:
    Given the user login to the Outpatient Clinic
    And the user arrives on a patient’s summary page

  @form-management
  Scenario: Users should be able to manage the submitted forms and add forms
    When the user clicks on Forms & Notes tab
    Then the empty form table should displayed
