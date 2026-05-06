---
sidebar_label: 'JORS'
title: Job Output Retrieval System (JORS)
description: "Configure the Job Output Retrieval System (JORS) so SAP job output is viewable from the OpCon Enterprise Manager."
tags:
  - Procedural
  - System Administrator
  - Agents
---

# Job Output Retrieval System

## What is it?

The Job Output Retrieval System (JORS) lets operators open a SAP job's log and spool file directly from the OpCon Enterprise Manager. The SAP Agent installs a companion JORS Windows service that listens on its own TCP port; when an operator selects **View Job Output** in the EM, JORS finds the matching files for that job and streams them back to the EM for display.

## How it works

```
EM ──(JORS Port Number)──► JORS service ──► SAP Agent ──► SAP system (job log + spool)
```

The EM connects to the JORS service on the agent host. JORS, in turn, retrieves the job log and spool file the agent captured during the job run and streams them back for display in the EM's Log Viewer.

## Components and matching ports

| Component | Lives in | Setting | Purpose |
|---|---|---|---|
| Agent **JORSSocket** | SAPLSAM.ini → JORS Settings | The TCP socket the JORS service listens on | The agent side of the connection. See [JORS settings](../administration/configuration-file.md#jors-settings). |
| EM **JORS Port Number** | OpCon machine record → Advanced Settings → Communication Settings | The TCP port the EM connects to | The EM side of the connection. |

:::tip Two values, one connection
**JORSSocket** (agent) and **JORS Port Number** (EM) must be identical for any single SAP Agent. They are not the same as **SocketNumberToSAM** / **Socket Number**, which are a separate matched pair for the agent's main communication with OpCon.
:::

## Before you begin

| Check | Why it matters |
|---|---|
| The SAP Agent and JORS services are running | JORS cannot retrieve output if either service is stopped. See [Managing the SAP Agent](../administration/manage-lsam.md). |
| **CaptureJobOutput** is `TRUE` in SAPLSAM.ini | The agent only saves per-job output when this is `TRUE`. With it `FALSE`, JORS has nothing to deliver. |
| You know the **JORSSocket** value the agent is configured with | You will enter the matching value as the **JORS Port Number** on the EM machine record. |

## High-level steps

| Phase | What you do | Goes to |
|---|---|---|
| 1 | Set the **JORS Port Number** on the SAP machine record | [Configure the JORS port in the EM](#configure-the-jors-port-in-the-em) |
| 2 | Confirm output retrieval works end to end | [View job output in the EM](#view-job-output-in-the-em) |

---

## Procedures

### Configure the JORS port in the EM

For the Enterprise Manager to connect to the JORS service, configure the **JORS Port Number** on the SAP machine record to match the agent's **JORSSocket** value.

#### Log on to the Enterprise Manager

To log on to the Enterprise Manager, complete the following steps:

1. Go to **Start > Programs > OpConxps > Enterprise Manager**.
2. In the **Username** text box, enter a *case-sensitive User Login ID* (for example, `ocadm`).
3. In the **Password** text box, enter the *case-sensitive password* for the user.
4. In the **Profile** list, select the *Profile*.
5. Select **Login** to log on to the Enterprise Manager.

#### Stop communication with the SAP machine

To stop communication, complete the following steps:

1. Open **Machines** in the Navigation panel under **Administration**.
2. In the **Select Machine** list, select the SAP Machine.
3. Right-click over the graphic in the **Communication Status** frame to enable the menu.
4. Select **Stop Communication** from the menu.

#### Set the JORS Port Number

To set the JORS Port Number, complete the following steps:

1. Select **Open Advanced Settings Panel** in the **Advanced Settings**.
2. Select the **Communication Settings** tab.
3. Select the **JORS Port Number** parameter.
4. In the **Modify Parameter** frame at the bottom of the screen, enter the *same value entered for the **JORSSocket*** in the agent configuration. See [JORS settings](../administration/configuration-file.md#jors-settings).
5. Select **Update**.
6. Select **Save** to save and close the Advanced Settings Panel.

#### Restart communication with the SAP machine

To restart communication, complete the following steps:

1. Right-click over the graphic in the **Communication Status** frame to enable the menu.
2. Select **Start Communication** from the menu.
3. Close the **Machines** screen.

### View job output in the EM

Use this procedure to confirm JORS is working end to end after configuration, or any time an operator needs to retrieve a SAP job's log or spool.

To view job output in the EM, complete the following steps:

1. Under the **Operation** topic, open **List** below the Navigation tab on the Enterprise Manager Screen.
2. Select the **plus sign (+)** to expand the specific *date*.
3. Select the **plus sign (+)** to expand the specific *schedule*.
4. Right-click the desired **job** and select **View Job Output** from the menu.
5. Wait for JORS to retrieve the list of output files for the job in the **Job Output Retriever** window.
6. Open the **Output File(s)** name to retrieve the *output file information*. The **Log Viewer** window displays.
7. *(Optional)* Take any of the following actions on the displayed output:

   | Option | Result |
   |---|---|
   | Select **Copy To Clipboard** | Copies the displayed output to the Windows clipboard. |
   | Select **Open external editor** | Opens the output file in an external editor (for example, Notepad). |
8. Select **Close** to close the **Log Viewer** window.
9. Select **Close** to close the **Job Output Retriever** window.

## Verify JORS is working

After configuration, verify the round trip:

1. The SAP machine's **Communication Status** in the EM is green (communication is up).
2. Both **SMA OpCon Agent for SAP** and **SMA OpCon JORS for SAP** show **Status: Running** in the Windows Services console.
3. Run a small SAP job through OpCon, then use [View job output in the EM](#view-job-output-in-the-em) to retrieve the job log and spool.
4. The agent log (`SAPLSAM.log`) and JORS log (`SAPJORS.log`) show no errors during the retrieval. See [Logging](./logging.md) for log locations.

If any step fails, see the FAQs below.

## FAQs

**Why is View Job Output empty for a job that finished?**
Three things must all be true. Check them in order:

| Check | Where |
|---|---|
| **CaptureJobOutput** is `TRUE` | SAPLSAM.ini → Process Creation Parameters |
| Job log is smaller than **MaxJobLogSizeToRetrieve** | SAPLSAM.ini → General Settings |
| Spool is smaller than **MaxSpoolSizeToRetrieve** | SAPLSAM.ini → General Settings |

If any setting blocks retrieval, that output is not delivered to the EM.

**Why does View Job Output time out or fail to connect?**
Almost always a port mismatch. Confirm:
- The agent's **JORSSocket** in SAPLSAM.ini.
- The SAP machine record's **JORS Port Number** in Advanced Settings → Communication Settings.

The two must match. If they do, confirm both Windows services are running and the host firewall allows traffic on the JORS port.

**Do I need a separate JORS socket per agent instance?**
Yes. If multiple SAP Agents are installed on the same host, each agent requires a unique **JORSSocket**, and the OpCon machine record for each agent must reference its specific **JORS Port Number**. See [Multiple instances](../installation/multiple-instances.md).

**Where is the JORS socket configured?**
- On the agent side: SAPLSAM.ini under JORS Settings (`JORSSocket`).
- On the OpCon side: the EM machine record's Advanced Settings → Communication Settings (`JORS Port Number`).

The two values must match.

**Why does the procedure stop communication, change the port, then start communication again?**
The EM machine record's Advanced Settings cannot be edited while communication with the SAP machine is active. Stopping and restarting communication is how you safely apply the change.

**Where does JORS write its log?**
`SAPJORS.log` in the agent's log folder under the Output Directory. See [Logging](./logging.md).

## Glossary

**JORS** — Job Output Retrieval System. The companion service the SAP Agent installs to deliver SAP job logs and spool output to the Enterprise Manager.

**JORSSocket** — The TCP socket the agent's JORS service listens on. Configured by the `JORSSocket` setting in SAPLSAM.ini.

**JORS Port Number** — The matching value in the EM machine record's Advanced Settings that the EM uses to reach the agent's JORS service.

**Log Viewer** — The EM window that displays the contents of an output file retrieved by JORS.

**Job Output Retriever** — The EM window that lists the output files JORS finds for a selected job.
