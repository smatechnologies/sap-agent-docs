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

## 21

### 21.0.0

2025 April

This release improves SAP connection handling and updates the SAP connector libraries.

#### Bug fixes

- Modified the SAP Agent to use SAP connection information from its configuration file, including the XBP Interface Version, while making interactive queries.
- Fixed agent code to handle `RfcTypeConversionException` gracefully without getting stuck in a loop. Updated the SAP Agent to use the latest SAP connector libraries.

## 20

### 20.2.0

2022 June

This release restores compatibility with SAP systems upgraded to version 2021 or later.

#### Bug fixes

- Fixed an issue where an upgrade of the SAP system to version 2021 or later required new connector library versions to connect from the SAP Agent.

### 20.1.0

2021 January

This release resolves two stability issues in the SAP Agent service.

#### Bug fixes

- Fixed an issue where the logging component sometimes timed out waiting to gain access to the log, causing the SAP Agent to stop responding.
- Fixed an issue where a change in the SAP schema definition file after an SAP system upgrade caused run-time errors when starting SAP jobs and required a manual delete of the old schema file before restarting the SAP Agent. The schema file is now created automatically by the SAP Agent on startup.
- Fixed an issue where the SAP Agent logged incorrect configuration information.

### 20.0.0

2020 September

This release improves job reporting performance and corrects two output-retrieval defects.

#### Bug fixes

- Fixed a performance issue where under significant load, jobs took much longer to report as finished on the OpCon side.
- Fixed an issue where the SAP Agent failed to read job output for the step failure when a SAP job fails.
- Fixed an issue where the SAP system name allowed was only `SAPSYSTEM` instead of any user-defined name in the SAP configuration file.

## 19

### 19.1.0

2019 December

This release moves the SAP proxy service from the OpCon server to the SAP Agent.

#### Important changes

:::danger SAP proxy moved to the SAP Agent
As of Release 19.1.0, the SAP proxy service is no longer installed with the SAM.

Customers who run a SAP Agent must upgrade to Release 19.1.0 when they install OpCon 19.1.0 to retain SAP proxy functionality.
:::

## 18

### 18.3.0

2018 November

This release adds child process restart capability and spool retrieval in the Enterprise Manager.

#### New features and improvements

- Added the ability to restart an individual SAP child process.
- Added the ability to retrieve SAP job spools in the Enterprise Manager.

### 18.1.1

2018 June

#### Bug fixes

- Fixed an issue where SAP job track and queue functionality did not work with certification changes.

### 18.0.0

*(Date not recorded)*

This release certifies OpCon with all current SAP requirements using the latest SAP APIs, and significantly expands Enterprise Manager capabilities for SAP integration.

#### New features and improvements

- OpCon 18.0.0 has been certified by SAP with all current requirements using the latest SAP APIs.
- Increased the variant parameter length to up to 255 characters.
- Users can now create a new variant directly from within the Enterprise Manager.
- Users can now create a temporary variant from the Enterprise Manager, stored in OpCon and dynamically sent with variable and property replacement at submission time.
- Users can now create, modify, delete, activate, and deactivate profiles and manage associated criteria (Job Interception Profile or Event Monitoring Profile).
- Users can now define an email address as a recipient of the spool list for a job.
- Users can now view a specific spool file for a selected job in Daily.
- The Enterprise Manager now asks users to delete the job in SAP when a master job is about to be deleted on user request.
- Added support for SAP Event Driven Automation, which maps OpCon events to run when specific SAP events run.
- Added the ability to read application log content and the application return code.

## 17

### 17.1.0

2017 September

#### Bug fixes

- Fixed an issue where reporting child process statuses to OpCon took a long time, causing delays in SAP job processing.

:::note
This same fix was delivered in the **17.0.2** and **16.2.7** versions.
:::

## 16

### 16.2.1

2017 April

#### Bug fixes

- Fixed an issue where the SAP Agent went into a loop when it received a job kill command for a job that it had already reported as finished, causing SAP jobs in OpCon to remain in a start attempted state.
- Fixed an issue where the SAP Agent went into a loop upon encountering an `RfcAbapRuntimeException`, causing SAP jobs in OpCon to remain in a start attempted state.

### 16.2.0

2016 December

#### New features and improvements

- Added the `MaxJobLogSizeToRetrieve` configuration setting to control job log retrieval size.

#### Bug fixes

- Fixed an issue where the SAP Agent did not recognize the **Version** configuration setting and failed to connect to the SAP system.
- Fixed an issue where the `MaxSpoolSizeToRetrieve` configuration setting was applied to both job logs and spools.

### 16.1.0

2016 September

This release converts the SAP Agent to a 64-bit installation and adds load balancing and extended job step support.

#### New features and improvements

- The SAP Agent is now a 64-bit application. It does not upgrade the 32-bit version. Customers can uninstall the existing 32-bit version before installing the new 64-bit version, or install the 64-bit version to a new location without affecting the existing 32-bit version.
- Updated the SAP Agent to support up to 500 steps per job.
- Added support for connecting to SAP using the **R3Name** and **Group** settings from the Advanced Machine Properties in the Enterprise Manager to make use of load balancing servers in SAP.
