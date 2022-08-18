Feature: Vitals and Triage

  Background:
    Given the user is logged in
    And the user arrives on a patient’s summary page

  @patient-visit-start
    Scenario: The user should be able to start a visit
      When the user clicks on Start visit
      Then the start a visit page should load
      When the user add the details and submit
      Then the visit should be started

  @patient-visit-end
    Scenario: The user should be able to ends the clinical visit
      When the user ends the clinical visit
      Then the visit should end successfully
