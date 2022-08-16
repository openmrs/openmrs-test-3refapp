Feature: Vitals and Triage

  Background:
    Given the user is logged in
    And the user arrives on a patient’s summary page

  @care-programs
    Scenario: The user add a care program and enroll patient
      When the user clicks on Programs tab
      Then the Care Programs section should display
      When the user clicks on Record program enrollments
      Then the Record program enrollment section should display
      When the user enroll to a program
      Then the patient should enrolled to the program
