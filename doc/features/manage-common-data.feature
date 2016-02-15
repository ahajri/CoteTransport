Feature: Manage common data
    Only appropriate user could manage common data
    Coffee should not be served until the button has been pressed
    If there is no coffee left then money should be refunded

  Scenario: Load common data
    Given there are a stuck of JSON and XML common files
    And User have manage-common-data role
    When I run the REST url
    Then MarkLogic Should confirm the loading of data