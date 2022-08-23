Feature: User Logout

  Background:
    Given the user login to the Outpatient Clinic
    And the user arrives on a patient’s summary page

  @patient-allergies
  Scenario: able to view all recorders allergies and record a new allergy
    When the user clicks on Allergies tab
    Then the empty allergies section should be displayed
        #Under development in O3
#    When the user record an allergy intolerances
#    Then the allergy should be recorded successfully
