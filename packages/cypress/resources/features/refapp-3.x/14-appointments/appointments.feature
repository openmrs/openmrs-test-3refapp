Feature: Appointments

  Background:
    Given the user is logged in
    And the user arrives on a patient’s summary page

  @appointments
    Scenario: The users should be able to make an appointment
      When a user clicks on Appointments tab
      Then the empty upcoming appointment table should displayed
      When a user clicks on past appointments section
      Then the empty past appointment table should displayed
#  ToDo: Requests an appointment
#      When a user requests an appointment
#      Then the request should saved successfully
