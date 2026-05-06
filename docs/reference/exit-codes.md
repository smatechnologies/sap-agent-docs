---
sidebar_label: 'Exit codes'
title: SAP Agent exit codes
description: "Reference list of SAP Agent-specific exit codes for failed jobs and what each one indicates about the failure."
tags:
  - Reference
  - System Administrator
  - Jobs
---

# SAP Agent-specific exit codes

## What is it?

When a SAP job fails, the SAP Agent reports an exit code that identifies the stage at which the failure occurred. Use this page to map an exit code in the 70000 range to the operation the agent was attempting (logon, job copy, status check, output retrieval, and so on).

:::note
Codes outside this list are Windows system error codes returned by the agent's host. Refer to [Windows System Errors](https://help.smatechnologies.com/opcon/core/reference/Windows-System-Errors) in the **Concepts** online help.
:::

## Definition errors

The agent could not assemble a valid request before contacting SAP.

|Exit Code|Description|
|--- |--- |
|70001|The Job Name the agent is trying to send to the SAP system is null.|
|70002|The Job Number the agent is trying to send to the SAP system is null.|
|70003|The SAP R/3 and CRM Definition does not have an SAP Job Name defined.|

## Connection and start errors

The agent reached SAP but could not authenticate or start the job.

|Exit Code|Description|
|--- |--- |
|70004|Error in logging on to SAP system: bad User ID, password, or TCP/IP address.|
|70005|Error in checking existing job status: could not find the job on the SAP system.|
|70006|Error in job copy: the agent could not copy the job to run it in SAP.|
|70007|Error in job definition get: after the job was copied for execution, the agent could not retrieve the copied job's details; therefore, the job could not run.|
|70008|Error in starting the copied job: the job copy and job retrieve were successful, but the agent could not start the job.|
|70017|Error in starting the job immediately because no background processes were available.|

## Runtime monitoring errors

The job started, but the agent could not monitor it through to completion.

|Exit Code|Description|
|--- |--- |
|70009|Error in getting the job's current status.|
|70010|Error in reading the job log.|
|70011|Error in getting the children job information for the current job.|
|70012|Error in aborting job.|
|70013|Error in reading the spoollist for the job.|

## FAQs

**My job failed with an exit code that isn't in this list. What does it mean?**
Codes outside this list are Windows system error codes. Refer to [Windows System Errors](https://help.smatechnologies.com/opcon/core/reference/Windows-System-Errors) in the **Concepts** online help.

**What should I check first if I see exit code 70004?**
70004 indicates a logon failure. Verify the User and Password configured in SAPLSAM.ini, the SAP Gateway/SystemNumber/ClientID, and that the OpCon SAP login still has the required authorization roles. See [Prerequisites](../installation/prerequisites.md).

**What does exit code 70017 indicate?**
The agent could not start the job immediately because no SAP background work processes were available. This is typically a SAP-side capacity condition, not a misconfiguration.
