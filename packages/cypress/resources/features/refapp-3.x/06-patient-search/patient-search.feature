Feature: Patient Search

  Background:
    Given the user login to the Outpatient Clinic
    And John Doe is registered on the system
    And the user visit the home page

  @patient-search
  Scenario Outline: Search for a patient
    When the user search for "<patientName>"
    Then the result should be "<result>"
    Examples:
      | patientName  | result            |
      | Harry Potter | Harry Potter      |
      | non existing | Sorry, no patient |
