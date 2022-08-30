Feature: Patient Allergies

  Background:
    Given the user is logged in
    And the user arrives on a patient’s summary page

  @patient-allergies
    Scenario: Users are able to view all recorded allergies and record a new allergy
      When the user clicks on Allergies tab
      Then the empty allergies section should be displayed
        #Todo
#    When the user record an allergy intolerances
#    Then the allergy should be recorded successfully
