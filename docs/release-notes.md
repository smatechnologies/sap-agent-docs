---
sidebar_label: 'Release notes'
title: SAP Agent release notes
description: "Version history and change details for the SAP Agent, including new features, improvements, and bug fixes."
tags:
  - Reference
  - System Administrator
  - Agents
---

# SAP Agent release notes

This page lists changes for each SAP Agent release, organized by major version. Each entry is prefixed with one of the following indicators:

- :eight_spoked_asterisk: — New feature or enhancement
- :white_check_mark: — Bug fix

## 21

### 21.0.0

**2025 April**

This release improves SAP connection handling and updates the SAP connector libraries.

:white_check_mark: **Configuration-based SAP connection for interactive queries** Modified the SAP Agent to use SAP connection information from its configuration file, including the XBP Interface Version, while making interactive queries.

:white_check_mark: **RFC type conversion exception handling improved** Fixed agent code to handle `RfcTypeConversionException` gracefully without getting stuck in a loop. Updated the SAP Agent to use the latest SAP connector libraries.

## 20

### 20.2.0

**2022 June**

This release restores compatibility with SAP systems upgraded to version 2021 or later.

:white_check_mark: **SAP 2021 connector library compatibility restored** Fixed an issue where an upgrade of the SAP system to version 2021 or later required new connector library versions to connect from the SAP Agent.

### 20.1.0

**2021 January**

This release resolves two stability issues in the SAP Agent service.

:white_check_mark: **Log access timeout resolved** Fixed an issue where the logging component sometimes timed out waiting to gain access to the log, causing the SAP Agent to stop responding.

:white_check_mark: **SAP schema file auto-creation on startup** Fixed an issue where a change in the SAP schema definition file after an SAP system upgrade caused run-time errors when starting SAP jobs and required a manual delete of the old schema file before restarting the SAP Agent. The schema file is now created automatically by the SAP Agent on startup.

:white_check_mark: **Incorrect configuration logging corrected** Fixed an issue where the SAP Agent logged incorrect configuration information.

### 20.0.0

**2020 September**

This release improves job reporting performance and corrects two output-retrieval defects.

:white_check_mark: **Job completion reporting delay under load resolved** Fixed a performance issue where under significant load, jobs took much longer to report as finished on the OpCon side.

:white_check_mark: **Job output read for step failures** Fixed an issue where the SAP Agent failed to read job output for the step failure when a SAP job fails.

:white_check_mark: **User-defined SAP system name support** Fixed an issue where the SAP system name allowed was only `SAPSYSTEM` instead of any user-defined name in the SAP configuration file.

## 19

### 19.1.0

**2019 December**

This release moves the SAP proxy service from the OpCon server to the SAP Agent.

:::danger SAP proxy moved to the SAP Agent
As of Release 19.1.0, the SAP proxy service is no longer installed with the SAM.

Customers who run a SAP Agent must upgrade to Release 19.1.0 when they install OpCon 19.1.0 to retain SAP proxy functionality.
:::

## 18

### 18.3.0

**2018 November**

This release adds child process restart capability and spool retrieval in the Enterprise Manager.

:eight_spoked_asterisk: **Individual SAP child process restart** Added the ability to restart an individual SAP child process.

:eight_spoked_asterisk: **SAP job spool retrieval in the Enterprise Manager** Added the ability to retrieve SAP job spools in the Enterprise Manager.

### 18.1.1

**2018 June**

:white_check_mark: **Job track and queue with certification changes** Fixed an issue where SAP job track and queue functionality did not work with certification changes.

### 18.0.0

*(Date not recorded)*

This release certifies OpCon with all current SAP requirements using the latest SAP APIs, and significantly expands Enterprise Manager capabilities for SAP integration.

:eight_spoked_asterisk: **SAP API certification** OpCon 18.0.0 has been certified by SAP with all current requirements using the latest SAP APIs.

:eight_spoked_asterisk: **Extended variant parameter length** Increased the variant parameter length to up to 255 characters.

:eight_spoked_asterisk: **Create variants in the Enterprise Manager** Added the ability to create a new variant directly from within the Enterprise Manager.

:eight_spoked_asterisk: **Temporary variant creation** Added the ability to create a temporary variant from the Enterprise Manager, stored in OpCon and dynamically sent with variable and property replacement at submission time.

:eight_spoked_asterisk: **Profile management in the Enterprise Manager** Added the ability to create, modify, delete, activate, and deactivate profiles and manage associated criteria (Job Interception Profile or Event Monitoring Profile).

:eight_spoked_asterisk: **Email recipient for spool list** Added the ability to define an email address as a recipient of the spool list for a job.

:eight_spoked_asterisk: **View specific spool file in Daily** Added the ability to view a specific spool file for a selected job in Daily.

:eight_spoked_asterisk: **Job deletion prompt in the Enterprise Manager** The Enterprise Manager now prompts to delete the job in SAP when a master job is about to be deleted on user request.

:eight_spoked_asterisk: **SAP Event Driven Automation** Added support for SAP Event Driven Automation, which maps OpCon events to run when specific SAP events occur.

:eight_spoked_asterisk: **Application log content and return code** Added the ability to read application log content and the application return code.

## 17

### 17.1.0

**2017 September**

:white_check_mark: **Child process status reporting delay resolved** Fixed an issue where reporting child process statuses to OpCon took a long time, causing delays in SAP job processing.

:::note
This same fix was delivered in the **17.0.2** and **16.2.7** versions.
:::

## 16

### 16.2.1

**2017 April**

:white_check_mark: **Job kill loop with already-finished jobs resolved** Fixed an issue where the SAP Agent went into a loop when it received a job kill command for a job that it had already reported as finished, causing SAP jobs in OpCon to remain in a start attempted state.

:white_check_mark: **RfcAbapRuntimeException loop resolved** Fixed an issue where the SAP Agent went into a loop upon encountering an `RfcAbapRuntimeException`, causing SAP jobs in OpCon to remain in a start attempted state.

### 16.2.0

**2016 December**

:eight_spoked_asterisk: **MaxJobLogSizeToRetrieve configuration setting** Added the `MaxJobLogSizeToRetrieve` configuration setting to control job log retrieval size.

:white_check_mark: **Version configuration setting recognition** Fixed an issue where the SAP Agent did not recognize the **Version** configuration setting and failed to connect to the SAP system.

:white_check_mark: **MaxSpoolSizeToRetrieve applied only to spools** Fixed an issue where the `MaxSpoolSizeToRetrieve` configuration setting was applied to both job logs and spools.

### 16.1.0

**2016 September**

This release converts the SAP Agent to a 64-bit installation and adds load balancing and extended job step support.

:eight_spoked_asterisk: **64-bit installation** The SAP Agent is now a 64-bit application. It does not upgrade the 32-bit version. Customers can uninstall the existing 32-bit version before installing the new 64-bit version, or install the 64-bit version to a new location without affecting the existing 32-bit version.

:eight_spoked_asterisk: **Up to 500 job steps supported** Updated the SAP Agent to support up to 500 steps per job.

:eight_spoked_asterisk: **Load balancing server support** Added support for connecting to SAP using the **R3Name** and **Group** settings from the Advanced Machine Properties in the Enterprise Manager to make use of load balancing servers in SAP.
