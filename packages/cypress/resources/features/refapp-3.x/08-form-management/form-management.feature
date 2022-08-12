Feature: User Logout

  Background:
    Given the user login to the Outpatient Clinic

  Scenario: form entry widget loads & displays all expected forms
    When a user click on forms section
    Then form entry widget loads & displays all expected forms
