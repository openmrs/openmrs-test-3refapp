Feature: User Settings

  Background:
    Given the user login to the Outpatient Clinic
    And the user visit the home page

  @user-settings
  @locale
  Scenario: The user should be able to change the locale
    When the user change the locale to Spanish
    And user clicks on patient search option
    Then the text should change into spanish

  @user-settings
  Scenario: The user should be able to change the location
    When the user clicks on the users icon
    Then the current location should be there
    When the user change the location to "Inpatient Ward"
    Then the user should be on the home page
    And the current location should be "Inpatient Ward"
