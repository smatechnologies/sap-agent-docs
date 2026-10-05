---
sidebar_label: 'Logging'
title: SAP Agent logging
description: "Where the SAP Agent and JORS services write log and trace files, how archives are named and rotated, and how to control log retention."
tags:
  - Reference
  - System Administrator
  - Agents
---

# Logging

## What is it?

The SAP Agent and the companion JORS service write daily logs covering processing, communication, configuration changes, and per-job output. Administrators use these logs to verify successful startup, trace job failures, and audit configuration changes over time.

## Log files at a glance

| File | Written by | Contents |
|---|---|---|
| `SAPLSAM.log` | SMA OpCon Agent for SAP | Job processing activity. Configuration is also written here at startup and whenever SAPLSAM.ini changes. |
| `SAPLSAMTrace.log` | SMA OpCon Agent for SAP | Trace of messages to and from SMANetCom. Controlled by `TraceSAMMessages`. |
| `SAPJORS.log` | SMA OpCon JORS for SAP | Output retrieval activity. |
| `<SAP job name>#<SAP job count>.log` | SMA OpCon Agent for SAP | Per-job log captured for each SAP job. |
| `<SAP job name>#<SAP job count>.spool` | SMA OpCon Agent for SAP | Per-job spool file captured for each SAP job. |

All log files live under the **Output Directory**:

- Service logs: `<Output Directory>\SAP LSAM\Log\`
- Per-job logs and spools: `<Output Directory>\SAP LSAM\JobOutput\`

:::note
The Output Directory was configured during installation. For more information, refer to [File Locations](https://help.smatechnologies.com/opcon/core/file-locations) in the **Concepts** online help.
:::

## Log archive behavior

When a log file reaches the size set by `MaximumLogFileSize`, the agent and JORS services rotate the file into a dated archive folder. Archives live in `<Output Directory>\SAP LSAM\Log\Archives\` (one folder per day each service was active).

Folder names use the convention `yyyy_mm_dd (Weekday)`. The logging mechanism generates the weekday name according to the machine's Regional Settings.

:::info
If the Regional Settings are set to English, an archive folder would have the following name:

```console
2008_01_11 (Friday)
```

If the Regional Settings are set to French, an archive folder would have the following name:

```console
2008_01_11 (Vendredi)
```

:::

As each log file fills up, the SAP Agent and JORS services move the log files into the current archive folder and rename them using the following naming convention: LogName StartTime - StopTime.log. For example, an SAP R/3 agent archive file for the time range of 12:58:16 to 13:58:00 would be SAPLSAM 125816 - 135800.log.

By default 10 days of archived logs are retained. Configure the SAPLSAM.ini file to adjust this setting. For information on the configuration of debug and log settings, refer to [Debug options](../administration/configuration-file.md#debug-options).

:::caution
The SAP Agent and SAP JORS services do not purge a service-log archive folder if it contains files other than archived logs. Per-job output archives are handled differently: the SAP Agent deletes each dated folder under `JobOutput\Archives\` once it is older than **ArchiveDaysToKeep**, together with everything in it. For this clean-up, the agent reads **ArchiveDaysToKeep** only when the service starts.
:::

## Per-job logs and spool files

For each job the SAP Agent runs, it creates a job log file (`<SAP job name>#<SAP job count>.log`) and a job spool file (`<SAP job name>#<SAP job count>.spool`) in the `JobOutput` folder. Characters that are not valid in file names are replaced with `-`. If the job has no SAP job count, the files are named with the SAM job ID instead. When the job completes, the agent archives both files into a dated folder under `<Output Directory>\SAP LSAM\JobOutput\Archives\`.

Archive folder names follow the same `yyyy_mm_dd (Weekday)` convention. For example, the archive for January 11, 2008 would be `2008_01_11 (Friday)`.

## FAQs

**How long are archived logs retained?**
By default, 10 days. The retention period is controlled by **ArchiveDaysToKeep** in SAPLSAM.ini.

**Why didn't my old archive folders get purged?**
The SAP Agent and SAP JORS services skip a service-log archive folder if it contains any files other than archived log files. Move or delete the extra files to allow the folder to be purged on the next archive cycle.

**Where do per-job logs and spool files live?**
Per-job logs are written to the `JobOutput` folder under the Output Directory. After a job completes, the agent moves the files to `<Output Directory>\SAP LSAM\JobOutput\Archives\<yyyy_mm_dd (Weekday)>\`.

**How do I increase log verbosity for troubleshooting?**
Increase **TraceLevel** in SAPLSAM.ini to 1 or 2 and ensure **TraceSAMMessages** is ON. See [Debug options](../administration/configuration-file.md#debug-options).

## Glossary

**SAPLSAM.log** — The agent's main processing log. Written by the SMA OpCon Agent for SAP service.

**SAPLSAMTrace.log** — The agent's communication trace log. Written when **TraceSAMMessages** is ON.

**SAPJORS.log** — The processing log for the SMA OpCon JORS for SAP service.

**Archive folder** — A dated folder under `\Log\Archives\` that holds log files rotated out of the active log directory.
