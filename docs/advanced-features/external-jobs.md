---
sidebar_label: 'Managing external jobs'
title: Tracking and queuing external SAP jobs
description: "Configure the SAP Agent to intercept SAP jobs started outside OpCon and either track them or queue them for OpCon-controlled release."
tags:
  - Procedural
  - Automation Engineer
  - Jobs
---

# Tracking and queuing external jobs

## What is it?

Some SAP jobs are submitted directly in SAP by users — not by OpCon. The SAP Agent can intercept those jobs at submission time and either **track** them (record them in OpCon while letting them run normally) or **queue** them (hold them until OpCon dependencies are satisfied, then release them).

This lets operators see a complete picture of SAP work in OpCon Operations even for jobs that originate in SAP, and it lets administrators apply OpCon dependencies to those jobs.

## How it works

```
SAP user submits job ──► Agent intercepts (XBP profile) ──► Decision
                                                              │
                              ┌───────────────────────────────┴───────────────────────────────┐
                              ▼                                                               ▼
                          Tracked                                                         Queued
        Agent releases the job immediately +              Agent holds the job in Intercepted status +
        sends $JOB:TRACK to SAM                           sends $JOB:QUEUE to SAM
                              │                                                               │
                              ▼                                                               ▼
                  SAM records the run                              SAM qualifies against OpCon dependencies
                                                                            then submits back to agent
                                                                                       │
                                                                                       ▼
                                                                  Agent releases the job to run on SAP
```

After SAM accepts the Track or Queue request, the job appears in Operations in the Enterprise Manager.

## Tracking versus queuing

| | Tracked | Queued |
|---|---|---|
| **What happens at submission** | Agent intercepts, then releases immediately to run | Agent intercepts and holds in **Intercepted** status |
| **OpCon role** | Records the run for visibility | Qualifies the job against OpCon dependencies before release |
| **Event sent to SAM** | `$JOB:TRACK` | `$JOB:QUEUE` |
| **Use when** | You want SAP-submitted jobs visible in OpCon Operations | You want SAP-submitted jobs to wait on OpCon time or dependency rules |

## Before you begin

| Check | Why it matters |
|---|---|
| A job intercept profile is configured and activated in SAP | Without an active profile, SAP does not call the agent's interception logic when jobs are submitted. |
| INITXBP2 has been run on the SAP system | XBP interception requires the program to have been initialized. |
| Interception 3.0 is activated in SAP | The agent uses Interception 3.0 messages. |
| You know the SAP-side **client id**, **job name**, and **job creator** for each job to track or queue | These three values are how the agent matches an incoming SAP job submission to a Job Track/Queue rule. |
| You know the matching OpCon **schedule**, **frequency**, and **job name** for each job | These are how the agent tells SAM where to record the job. |

## High-level steps

| Phase | What you do | Goes to |
|---|---|---|
| 1 | Define matching jobs in OpCon Job Master | [Define external jobs in Job Master](#define-external-jobs-in-job-master) |
| 2 | Add Track or Queue rules to SAPLSAM.ini | [Configure the Job Track/Queue section in the SAPLSAM.ini file](#configure-the-job-trackqueue-section-in-the-saplsamini-file) |
| 3 | Verify a SAP-submitted job appears in OpCon Operations | [Verify tracking or queuing](#verify-tracking-or-queuing) |

## SAP-side configuration screenshots

The screenshots below show one example of preparing the SAP side.

### Initialization Program for Background Processing Interface XBP 2.0

![Initialization Program for Background Processing Interface XBP 2.0](../static/img/Initialization-Program-for-Background-Processing-Interface-XBP-2.0.jpg "Initialization Program for Background Processing Interface XBP 2.0")

### Criteria Manager

![Criteria Manager](../static/img/Criteria-Manager.jpg "Criteria Manager")

### SAPLsam.ini Settings

![SAPLsam.ini Settings](../static/img/SAPLsam.ini-Settings.png "SAPLsam.ini Settings")

---

## Procedures

### Define external jobs in Job Master

Each SAP job to be tracked or queued must have a matching job record in OpCon Job Master, with a frequency that prevents it from being auto-built into a daily schedule.

To define an external job in Job Master, complete the following steps:

1. Under the **Administration** topic, open **Job Master** below the Navigation tab on the Enterprise Manager screen. The **Job Master** screen displays.
2. In the **Schedule** list, select the *desired Schedule* (for example, AdHoc). See [The AdHoc schedule](#the-adhoc-schedule) for why this is recommended.
3. On the toolbar, select **+** to add a new job to the schedule.
4. Set the basic job fields:

   | Field | Required | What to enter |
   |---|---|---|
   | Name | Yes | The OpCon name for the job. Must match **TrackOpConJobName1** / **QueueOpConJobName1** in SAPLSAM.ini. |
   | Job Type | Yes | **SAP R/3 and CRM** |
   | Primary Machine | Yes | The OpCon machine record for the SAP system this job runs on. |
5. On the toolbar, select **Save** to save the job definition.
6. Select the **Frequency** tab and create a frequency that does not auto-build the job. SMA Technologies recommends:

   | Frequency setting | Value |
   |---|---|
   | When to Schedule | **On Request** |
   | Request Date | Any date in the past |
   | Every Year | **No** |
   | A/O/B/N flag | Set as desired |

Repeat for every SAP job you want to track or queue.

### Configure the Job Track/Queue section in the SAPLSAM.ini file

Each SAP job to track or queue is described by a numbered group of settings (for example, all of the `*1` settings describe one job). The agent matches an incoming SAP submission against these groups.

#### Open SAPLSAM.ini

To open SAPLSAM.ini, complete the following steps:

1. Right-click the **Start** button and select **Explore**.
2. Browse to `<Configuration Directory>\SAP LSAM\`.
3. Right-click **SAPLSAM.ini** and select **Open With**.
4. Select an *ASCII text editor* (for example, Notepad) from the **Choose the program you want to use** list box.
5. Find the section titled `[Job Track/Queue Settings]`.

#### Set the shared poll interval

The whole section shares a single polling interval. Set it once.

| Setting | Description |
|---|---|
| **JobTrackCheckInterval** | Seconds between checks for tracked or queued jobs on the SAP system. Defined once for the whole section. |

#### Define a Track or Queue rule

A rule is a numbered group of six fields. The Track and Queue field sets are parallel — the description, matching behavior, and denial conditions are identical.

For each SAP job to track or queue, set every field in the table below for that rule's number.

| Track field | Queue field | Required | Describes |
|---|---|---|---|
| **TrackFrequencyName1** | **QueueFrequencyName1** | No | The frequency name configured in OpCon for this job. |
| **TrackOpConSkdName1** | **QueueOpConSkdName1** | No | The schedule name configured in OpCon for this job. |
| **TrackOpConJobName1** | **QueueOpConJobName1** | Yes | The job name configured in OpCon. Must match the **Name** in Job Master. |
| **TrackClientID1** | **QueueClientID1** | Yes | The client id under which the job starts on the R/3 or CRM system. |
| **TrackJobName1** | **QueueJobName1** | Yes | The job name in the R/3 or CRM system. Wildcards `*` and `?` are supported. |
| **TrackJobCreator1** | **QueueJobCreator1** | Yes | The job creator in the R/3 or CRM system. Wildcards `*` and `?` are supported. |

#### When the agent denies a Track or Queue request

The agent denies the request and writes a message to its log under any of the conditions below. Use this list when troubleshooting a job that did not appear in Operations.

| Condition | Behavior |
|---|---|
| Frequency named in **TrackFrequencyName1** / **QueueFrequencyName1** does not exist for the OpCon job | Request denied. |
| Frequency is not provided | SAM-SS uses the first defined frequency for the OpCon job. |
| Schedule named in **TrackOpConSkdName1** / **QueueOpConSkdName1** is not in the Daily tables for the current date | Request denied. *(Exception: the AdHoc schedule is added automatically.)* |
| OpCon job name does not exist in Job Master | Request denied. |
| Duplicate OpCon job already exists in Daily tables and the job name is **longer than 8 characters** | Request denied. |
| Duplicate OpCon job already exists in Daily tables and the job name is **8 characters or fewer** | Job runs with `$nnn` suffix appended (for example, `TestJob$001`, `TestJob$002`). |

#### Define additional rules

To define another job to track or queue, copy an existing six-field group and change the trailing `1` to a new number. For example, copy the `*1` Track group and rename the fields to `*2`:

```ini
TrackFrequencyName2=...
TrackOpConSkdName2=...
TrackOpConJobName2=...
TrackClientID2=...
TrackJobName2=...
TrackJobCreator2=...
```

Track and Queue numbers are independent — `Track1` and `Queue1` describe different jobs.

#### Save and apply

To save and apply, complete the following steps:

1. Go to **File > Save**.
2. Close the text editor.

The Job Track/Queue settings are dynamic — the agent picks up changes automatically without a service restart. See [Configuration file](../administration/configuration-file.md#job-trackqueue-settings).

## The AdHoc schedule

SMA Technologies recommends adding jobs to be tracked to the AdHoc schedule for two reasons:

| Reason | Detail |
|---|---|
| Auto-add to Daily tables | The AdHoc schedule is dynamically added to the Daily tables when SAM-SS is informed of a job on the schedule that is to be tracked. Other schedules must already be built. |
| Open until midnight | Once active, the AdHoc schedule remains open until midnight and only closes when all of its jobs have finished. |

If tracked jobs are on user-defined schedules, those schedules must be built and active in the Daily tables for the SAM-SS to track the jobs, and the schedule name must be specified in SAPLSAM.ini. With AdHoc, you can leave **TrackOpConSkdName** / **QueueOpConSkdName** blank.

## Verify tracking or queuing

To confirm tracking or queuing is working end to end:

1. Submit the matching SAP job directly in SAP.
2. In the Enterprise Manager **Operations** view, confirm the job appears under the OpCon schedule and job name configured for the rule.
3. *(Tracked)* The job should briefly show **Intercepted** and then transition to a running state.
4. *(Queued)* The job should remain in **Intercepted** until OpCon dependencies qualify it, then run.
5. In the agent log (`SAPLSAM.log` under the Output Directory), confirm a `$JOB:TRACK` or `$JOB:QUEUE` event was sent and accepted by SAM.

If the job did not appear, see the [When the agent denies a Track or Queue request](#when-the-agent-denies-a-track-or-queue-request) checklist or the FAQs below.

## FAQs

**What is the difference between Tracking and Queuing?**
A Tracked job is intercepted briefly, then immediately released to run while OpCon records the run. A Queued job is held in **Intercepted** status until OpCon's dependencies are satisfied, and only then is it released to SAP.

**What must be configured in SAP for tracking to work?**
A job intercept profile must be configured and activated in SAP that matches the Job Track/Queue configuration in SAPLSAM.ini. INITXBP2 must have been run on the SAP system, and Interception 3.0 must be activated.

**Why was my tracking or queuing request denied?**
Use the [When the agent denies a Track or Queue request](#when-the-agent-denies-a-track-or-queue-request) checklist. The most common causes are a missing OpCon job in Job Master, a schedule that is not in the Daily tables, or a duplicate job name longer than 8 characters.

**Why does SMA Technologies recommend the AdHoc schedule for tracked jobs?**
The AdHoc schedule is added to the Daily tables automatically when SAM is informed of a job to track and stays open until midnight. Tracked jobs can land on it without requiring a pre-built schedule, and you can leave **TrackOpConSkdName** blank.

**How do I track multiple jobs?**
Create additional Track or Queue groups by copying an existing six-field group and changing the trailing number. See [Define additional rules](#define-additional-rules).

**Do I need a separate group for tracking and queuing the same SAP job?**
A single SAP job is either tracked or queued by a given rule, not both. If you want different SAP submissions of the same job handled differently, define them as separate Track and Queue groups with non-overlapping match criteria.

**Are wildcards supported in the SAP-side match fields?**
Yes. **TrackJobName** / **QueueJobName** and **TrackJobCreator** / **QueueJobCreator** support `*` and `?` as wildcards.

**Do I need to restart the SAP Agent after adding rules?**
No. The Job Track/Queue settings are dynamic — the agent picks up changes automatically. See [Dynamic settings](../administration/configuration-file.md#how-to-read-this-page).

## Glossary

**Tracked job** — A SAP job started outside OpCon that the agent records in OpCon for visibility. The job runs immediately on SAP after a brief interception.

**Queued job** — A SAP job started outside OpCon that the agent holds in **Intercepted** status until OpCon dependencies qualify it for release.

**Intercepted status** — A SAP job state used by the XBP interface. The agent uses it to hold a job until OpCon decides to release it.

**AdHoc schedule** — An OpCon schedule that is dynamically added to the Daily tables when needed and stays open until midnight. Recommended for tracked or queued jobs.

**Job intercept profile** — A SAP-side configuration that tells SAP which submitted jobs to hand to the agent for interception.

**SAM-SS** — The OpCon Schedule Activity Monitor service-side component that processes track and queue requests.

**Track / Queue rule** — A numbered group of six fields in SAPLSAM.ini that matches one SAP job pattern to one OpCon job. The trailing number (`1`, `2`, etc.) is the rule's identifier.
