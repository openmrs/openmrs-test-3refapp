Feature: Vitals and Biometrics

  Background:
    Given the user login to the Outpatient Clinic
    And the user arrives on a patient’s chart page

  @vitals-and-biometrics
    Scenario: The user should be able to record vitals and biometrics
      When the user clicks on Record Vitals and Biometrics
      Then the Vitals form should load
      And the user adds vitals
      When the user saves the form
      Then the vitals needs to be displayed on the Vitals table
