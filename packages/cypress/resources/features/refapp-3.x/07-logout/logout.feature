Feature: User Logout

  Background:
    Given the user login to the Outpatient Clinic

  Scenario: user logout successfully from the application
    When the user logout from the application
    Then the user should be redirect to the login page
