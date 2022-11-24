Feature: Clinical Visit

  Background:
    Given the user login to the Outpatient Clinic


  @clinical-visit
  Scenario: The Patient Chart should load properly
    When the user arrives on a patient’s chart page
    Then the Patient header should display correct information
    And the user should be able to expand header to see more information

  @clinical-visit
  Scenario: User should be able to start a visit
    When the user arrives on a patient’s chart page
    And user selects "Start visit"
    And the user starts a visit
    Then Visit should be saved and started

  @clinical-visit
  Scenario: User should be able to end a visit
    When the user arrives on a patient chart page of a patient with an active visit
    And the user clicks on Actions button
    And user selects "Cancel Visit"
    And the user confirm cancellation
    Then the visit should have ended
