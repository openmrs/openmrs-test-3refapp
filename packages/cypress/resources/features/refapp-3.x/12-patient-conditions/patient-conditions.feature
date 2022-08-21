Feature: Patient Conditions

  Background:
    Given the user is logged in
    And the user arrives on a patient’s summary page

  @patient-conditions
    Scenario: The user should be able to record patient conditions
      When the user clicks on Conditions tab
      Then the empty Conditions page should display
      When the user record a condition
      Then the condition should record successfully
