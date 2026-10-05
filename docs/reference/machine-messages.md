---
sidebar_label: 'Machine messages'
title: SAP Agent machine messages
description: "Reference for the 20-character SAP Agent machine messages shown next to OpCon Job Status, including child job status codes and exit message formats."
tags:
  - Reference
  - Operations Staff
  - Jobs
---

# Machine messages

## What is it?

A machine message is a short, 20-character status string the SAP Agent attaches to each SAP job's row in OpCon. Operators use machine messages to triage SAP jobs at a glance from the Operation Daily List screen — without opening each job's details — to see whether a job is running, what its child jobs are doing, and (when the job ends) which SAP job ID or agent exit code is relevant.

## Where to find the message

In the *Detailed Job Messages* parameter on the **Enterprise Manager** > **Operation** > **Job Information** > **Configuration** > **Operations Related Information** tab. The 20-character message also appears next to the OpCon Job Status in the Operation Daily List screen. For additional information, refer to [Job Information](https://help.smatechnologies.com/opcon/core/Files/UI/Enterprise-Manager/Job-Information) in the **Enterprise Manager** online help.

## Message formats by job state

| Job state | Format | Example |
|---|---|---|
| Running (no children) | `<SAP job count>:<SAP job status>` | `12345678:Active` |
| Running (with children) | `<Child Name>:<Child status code>` | `MYCHILDJOB:Actv` |
| Finished OK | `0 - <SAP job count>` | `0 - 12345678` |
| Ended unsuccessfully in SAP (for example, cancelled) | `1 - <SAP job count>` | `1 - 12345678` |
| Failed with an agent error | `<Agent Exit Code>-<SAP job count>`, or `<Agent Exit Code>-<SAM job ID>` when no SAP job count is available. The exit code includes the SAP message number when SAP returned one. | `70010:049-12345678` |

For exit code meanings, see [Exit codes](./exit-codes.md).

## Child job status codes

When the running job has child jobs, the agent reports the current status using a three- or four-letter code:

| Code | Meaning |
|---|---|
| Actv | Active |
| Rdy | Ready |
| Int | Intercepted |
| Schd | Scheduled |
| Fin | Finished |
| Term | Terminated |
| Rel | Released |
| Invd | Does not exist |

The Child Name shows up to 15 characters of the child job name. The complete child name and its current status are available in the Job Configuration screen.

## FAQs

**Where do I see the machine message?**
Next to the OpCon Job Status in the Operation Daily List screen, in the Detailed Job Messages parameter on the Job Information screen.

**What does Int mean as a child job status?**
Intercepted. SAP reports the child job in its intercepted state.

**Why do some failure messages reference a SAM job ID instead of an SAP job count?**
The agent reports the SAM job ID only when it has no SAP job count for the job — for example, when the job definition does not include one (exit code 70002).

## Glossary

**Machine message** — The 20-character status string the SAP Agent populates next to OpCon Job Status in the Operation Daily List.

**Child job** — A SAP job spawned by a parent SAP job; tracked by the agent so the parent's overall status reflects child progress.

**Agent Exit Code** — A numeric code reported by the SAP Agent when a job fails. See [Exit codes](./exit-codes.md) for the full list.
