Feature: Clinical Visit

  Background:
    Given the user is logged in
    And the user arrives on a patient’s chart page

  @clinical-visit
  Scenario: The Patient Chart should load properly
    Then the Patient header should display correct information
    And the user should be able to expand header to see more information

  @clinical-visit
  Scenario: User should be able to start a vist
    When the user clicks on "Actions" button
    And user selects "Start vist" 
    Then the user starts a vist
    Then Visit should be saved and started

  @clinical-visit
  Scenario: User should be able to Edit a vist
    When the user clicks on "Actions" button
    And user selects "Edit vist" 
    Then the user edits a vist
    Then Visit should be saved and started

  @clinical-visit
  Scenario: User should be able to emd a vist
    When the user clicks on "Actions" button
    And user selects "End vist"
    Then the user ends a vist
    Then Visit should have ended

  @clinical-visit
  Scenario: User should be able to add a past vist
    When the user clicks on "Actions" button
    And user selects "Add past vist"
    Then the user clicks on Edit past Visit
    And the user selects Edit
    Then Visit should be saved and started
