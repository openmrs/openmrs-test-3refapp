Feature: Medications

  Background:
    Given the user is logged in
    And the user arrives on a patient’s summary page

  @patient-medications
    Scenario: The user should be able view active and past medications
      When the user clicks on Orders tab
      Then the empty Orders page should display
