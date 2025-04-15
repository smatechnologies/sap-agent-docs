# Release notes

## SAP Agent 21.0.0

2025 April

:white_check_mark: **SAP-122**: Modified Agent to use SAP connection information from its configuration file including the XBP Interface Version while making interactive queries.

:white_check_mark: **SAP-123**: Fixed agent code to handle RfcTypeConversionException gracefully without getting stuck in a loop. Updated Agent to use latest SAP connector libraries.

## SAP Agent 20.2.0

2022 June

:white_check_mark: **SAP-121**: Fixed an issue where an upgrade of the SAP system to version 2021+ required new versions of the libraries to connect to the system from the agent.

## SAP Agent 20.1.0

2021 January

:white_check_mark: **SAP-106**: Fixed an issue in SAP agent where the logging component sometimes timed out waiting to gain access to the log and the agent stopped responding.

:white_check_mark: **SAP-85**: Fixed an issue in SAP agent where a change in the SAP schema definition file after an SAP system upgrade caused run time errors when starting SAP jobs and required a manual delete of the old schema file before restarting the agent. Now, the schema file will be automatically created by the agent on startup resulting in no schema errors when starting a job.

:white_check_mark: **SAP-68**: Now prevents the SAP agent from logging incorrect configuration information.

## SAP Agent 20.0.0

2020 September

:white_check_mark: Fixed a performance issue in SAP agent where under significant load the jobs took much longer to report finished on the OpCon side.

:white_check_mark: Fixed an issue where SAP agent failed to read the job output for the step failure when an SAP job fails.

:white_check_mark: Fixed an issue where the SAP system name allowed was only "SAPSYSTEM", instead of any user defined name in the SAP config file.

## SAP Agent 19.1.0

2019 December

:eight_spoked_asterisk: As of Release 19.1.0, the SAP proxy service will no longer be installed with the SAM.

:::warning
You will need to upgrade to the latest version of the SAP LSAM to continue using this functionality.
:::

## SAP Agent 18.3.0

2018 November

:eight_spoked_asterisk: Added the ability to restart an individual SAP Child Process.

:eight_spoked_asterisk: Added the ability to retrieve SAP Job Spools in the Enterprise Manager.

## Older versions

<details>
<summary>See all</summary>
<br />

#### SAP Agent 18.1.1

2018 June

:white_check_mark: Fixed an issue where SAP job track/queue functionality did not work with certification changes.

#### SAP Agent 18.0.0

:eight_spoked_asterisk: OpCon 18.0.0 has been certified by SAP with all of the latest requirements using all new SAP APIs.

:eight_spoked_asterisk: Enterprise Manager now provides even more capabilities regarding SAP and OpCon integration, such as:

- Increased the variant parameter length up to 255 characters.
- Allows users to create a new Variant directly from within the Enterprise Manager.
- Allows users to create a temporary Variant from the Enterprise Manager, stored in OpCon and dynamically sent with variable/properties replacement on the fly at submission.
- Allows users to create/modify/delete/activate/deactivate Profiles and manage associated Criteria (Job Interception Profile or Event Monitoring Profile).
- Allows users to define an email address as a recipient of the spool list of a Job.
- Allows users to view a specific spool file for a selected job in Daily.
- Additionally asks users to delete the job in SAP when the Master job is about to be deleted on user request.
- Supports SAP Event Driven Automation which maps OpCon Event(s) to run when specific SAP Event(s) run.
- Reads application log content and reads the application return code.

#### SAP Agent 17.1.0

2017 September

:white_check_mark: Fixed an issue where the reporting of child process statuses to OpCon would take a long time, causing delays in SAP workflows.

:::note
This same fix was delivered in the **17.0.2** and **16.2.7** versions.
:::

#### SAP Agent 16.2.1

2017 April

:white_check_mark: Fixed an issue where the LSAM went into a loop when it received a job kill command for a job that it had already reported as finished and the SAP jobs in OpCon stayed in a start attempted state.

:white_check_mark: Fixed an issue where the LSAM went into a loop upon encountering an RfcAbapRuntimeException and the SAP jobs in OpCon stayed in a start attempted state.

#### SAP Agent 16.2.0

2016 December

:eight_spoked_asterisk: Added new configuration setting, MaxJobLogSizeToRetrieve, to handle job log retrieval.

:white_check_mark: Fixed an issue where the LSAM would not recognize the Version configuration setting and failed to connect to the SAP System.

:white_check_mark: Fixed an issue where the MaxSpoolSizeToRetrieve configuration setting was applied to both job logs and spools.

#### SAP Agent 16.1.0

2016 September

:eight_spoked_asterisk: As of 16.1, the SAP LSAM is now a 64-bit version that will be installed as a new product, and it does not upgrade the 32-bit version. Customers can uninstall the existing 32-bit version before installing the new 64-bit version, or install the 64-bit version to a new location and the existing 32-bit version will not be affected.

:eight_spoked_asterisk: Updated the SAP LSAM definition to handle up to 500 steps per job.

:eight_spoked_asterisk: Added support for the LSAM to connect to SAP using the R3Name and Group from the Advanced Machine Properties in the Enterprise Manager to make use of load balancing servers in SAP.

</details>
