# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

- 0: Create relation table CustomAgentsIds

    Estimate: 20min

    Details: CustomAgentsIds is made of attributes:
            facilityId: Facility Id,
            agentId: Agent Id and
            customId: Custom Id for the Agent given by the Facility

        facilityId and agentId must be unique tuple, so should facilityId and customId

        facilityId must reference the Facility table

        agentId must reference the Agent table

    Acceptance: the table must be created in the database 

- 1: Edit Create/Update for a Facility to enable setting the customId for each Agent linked to the Facility

    Estimate: 1h

    Acceptance: when a customId is set, there should be a new entry in the CustomAgentsIds table with the facilityId and agentId respective to the set customId

- 2: Edit Delete methods of Facility and Agent to also delete references in the CustomAgentsIds, correspondingly

    Estimate: 20min

    Acceptance: when deleting Facility, must also delete all records from CustomAgentsIds where the facilityId is present

    Acceptance: when deleting Agent, must also delete all records from CustomAgentsIds where the agentId is present

- 3: Add the customId from CustomAgentsId to the getShiftsByFacility, joining through the foreign keys

    Estimate: 15min

    Acceptance: amongst returned data, customId for an Agent should be present if there is a corresponding entry in CustomAgentsIds for the Facility and Agent

- 4: Substitute the agent id in the generateReport to be the customId when its present

    Estimate: 10min
    
    Acceptance: when a customId is present, it should be displayed in the report instead of the agentId
