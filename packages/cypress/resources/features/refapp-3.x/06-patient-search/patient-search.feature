Feature: Patient Search

  Background:
    Given the user login to the Outpatient Clinic

  @patient-search
  Scenario Outline: Search for a patient
    When the user search for "<patientName>"
    Then the result should be "<result>"
    Examples:
      | patientName  | result            |
      | Richard Jones   | Richard Jones    |
      | non existing | Sorry, no patient |
