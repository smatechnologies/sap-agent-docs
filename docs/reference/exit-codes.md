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

When a SAP job ends, the SAP Agent reports an exit code with it. Use this page to read the code: whether SAP ended the job, and, for a code in the 70000 range, the operation the agent was attempting (logon, job copy, status check, output retrieval, and so on).

## How the exit code is reported

| Exit code | Meaning |
|---|---|
| `0 - <SAP job count>` | The SAP job finished successfully. |
| `1 - <SAP job count>` | SAP ended the job unsuccessfully — for example, the job was cancelled in SAP. Check the job log in SAP or in View Job Output. |
| `700nn` | The agent could not complete an operation. The code appears with the SAP message number when SAP returned one, followed by a hyphen and the SAP job count — for example, `70010:049-12345678`. |

For how the code appears in the job's status line, see [Machine messages](./machine-messages.md).

## Definition errors

The agent could not assemble a valid request before contacting SAP.

|Exit Code|Description|
|--- |--- |
|70001|The job name (destination) required to identify the SAP target is missing or null.|
|70002|The job number required to track this job on the SAP system is null.|
|70003|The SAP R/3 and CRM job definition does not have an SAP job name defined.|
|70004|The external user configured in the **User** setting in SAPLSAM.ini is empty. The agent cannot attempt a logon without a user name.|

## Connection and logon errors

The agent reached SAP but could not establish or configure the session.

|Exit Code|Description|
|--- |--- |
|70005|Error logging on to the SAP system via the XMI interface. Verify the **User**, **Password**, **Gateway**, **SystemNumber**, and **ClientID** settings in SAPLSAM.ini.|
|70015|Error setting the XMI audit level during logon setup.|
|70016|Error verifying whether extended XBP functions are available on the SAP system.|

## Job start errors

Logged on successfully, but the agent could not start the job.

|Exit Code|Description|
|--- |--- |
|70006|Error checking whether the SAP job exists on the system before attempting to start it.|
|70007|Error copying the SAP job in preparation for execution.|
|70008|Error retrieving the job definition after the copy step. The copy succeeded but the agent could not read back the copied job's details.|
|70009|Error starting the copied job (ASAP scheduling). The copy and definition retrieval succeeded but the start call failed.|
|70017|Error starting the job immediately because no SAP background work processes were available.|

## Runtime monitoring errors

The job started, but a call the agent makes while monitoring it failed. **These codes do not fail the job.** The agent shows the code in the job's machine message, leaves the job running, and tries again at the next status check. If SAP reports that the job no longer exists (SAP message 049), the agent fails the job with the code.

|Exit Code|Description|
|--- |--- |
|70010|Error retrieving the job's current status during execution monitoring.|
|70018|Error retrieving current status for a list of monitored jobs.|
|70019|Error reading job details from the SAP system.|
|70013|Error sending the abort command to SAP for this job. The kill request failed and the job stays running.|

## Output retrieval errors

The agent could not read part of the job's output or statistics. **These codes are written to `SAPLSAM.log` only** — the job's status and exit code are not affected, but View Job Output may be incomplete.

|Exit Code|Description|
|--- |--- |
|70011|Error reading the job log after the job completed or failed.|
|70014|Error reading the job spool list using the XBP 2.0 interface.|
|70020|Error retrieving batch processing resource statistics from the SAP system. Only when **CaptureJobStatistics** is `TRUE`.|
|70021|Error retrieving application information from the SAP system. Only when **CaptureJobStatistics** is `TRUE`.|
|70022|Error reading the application log content for the job.|

## Codes the agent does not report

|Exit Code|Description|
|--- |--- |
|70001|Reserved for a missing destination. The SAP Agent does not report it.|
|70012|Error retrieving the list of child jobs. The agent logs this error to `SAPLSAM.log` and does not report it as an exit code.|

## FAQs

**My job failed with exit code 1. What does it mean?**
SAP ended the job unsuccessfully — for example, it was cancelled in SAP. The agent reports `1 - <SAP job count>`. Check the job log in SAP or in View Job Output to find the cause.

**My job shows a 70000-range code but is still running. Why?**
Codes 70010, 70013, 70018, and 70019 do not fail the job. The agent shows the code in the machine message and keeps monitoring the job. See [Runtime monitoring errors](#runtime-monitoring-errors).

**What should I check first if I see exit code 70004?**
70004 means the **User** setting in SAPLSAM.ini is empty. Add the SAP login user name and encrypt it before saving the file. See [Encrypt credentials in SAPLSAM.ini](../administration/configuration-file.md#encrypt-credentials-in-saplsamini).

**What should I check first if I see exit code 70005?**
70005 is an XMI logon failure. Verify the **User**, **Password**, **Gateway**, **SystemNumber**, and **ClientID** settings in SAPLSAM.ini. Also confirm the SAP user holds the `S_XMI_ALL` authorization role. See [Prerequisites](../installation/prerequisites.md).

**What does exit code 70017 indicate?**
The agent could not start the job immediately because no SAP background work processes were available. This is typically a SAP-side capacity condition, not a misconfiguration.
