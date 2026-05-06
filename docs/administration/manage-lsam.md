---
sidebar_label: 'Managing the agent'
title: Managing the SAP Agent
description: "Start, stop, and restart the SAP Agent and JORS services from the Windows Service Control Manager."
tags:
  - Procedural
  - System Administrator
  - Agents
---

# Managing the SAP Agent

## What is it?

The SAP Agent runs as two Windows services. This page covers how to start, stop, and restart them from the Windows Service Control Manager during installs, configuration changes, maintenance, and troubleshooting.

## Services at a glance

| Service | Role | Recommended Startup Type | Default Log on as |
|---|---|---|---|
| **SMA OpCon Agent for SAP** | The agent itself. Talks to OpCon and SAP. | Automatic (Delayed Start) | Local System |
| **SMA OpCon JORS for SAP** | The Job Output Retrieval System. Delivers job logs and spool output to the Enterprise Manager. | Automatic (Delayed Start) | Local System |

:::tip Manage both services together
Always start or stop both services in the same maintenance window. If only one is running, output retrieval and job processing fall out of sync.
:::

## When to use these procedures

| Trigger | Procedure |
|---|---|
| Editing non-dynamic settings in [SAPLSAM.ini](./configuration-file.md) (marked **N** in the Dynamic column) | [Restart both services](#restart-both-services) |
| Changing the service **Log on as** account | [Restart both services](#restart-both-services) |
| Bringing services up after a host reboot or planned outage | [Start both services](#start-both-services) |
| Taking the agent offline for an upgrade or extended maintenance | [Stop both services](#stop-both-services) |
| Troubleshooting communication between the agent and OpCon | [Restart both services](#restart-both-services), then check logs |

## Before you begin

| Check | Why it matters |
|---|---|
| You have local administrator credentials on the Windows host | Required to start, stop, or change Windows services. |
| You are not draining live SAP work | If jobs are still running, drain them first. See [Drain SAP work](../installation/upgrade-installation.md#drain-sap-work-from-the-agent). |
| You know the **Startup Type** and **Log on as** account each service should use | If the defaults were changed, reapply the same values when you bring services back up. |

---

## Procedures

### Open the Services console

Each procedure on this page begins by opening the Windows Services console. Open it once and leave it open while you work.

To open the Services console, complete the following steps:

1. Go to **Start > Control Panel**.
2. Open the **Administrative Tools** entry.
3. Open the **Services** entry. The **Services** window displays.

### Start both services

Start the agent first, then JORS. The first time you start a service after install, confirm the **Startup Type** is **Automatic (Delayed Start)**.

To start both services, complete the following steps:

1. Open the Services console — see [Open the Services console](#open-the-services-console).
2. For each service, in the order shown, take the action below:

   | # | Service | Action |
   |---|---|---|
   | 1 | **SMA OpCon Agent for SAP** | Open the service. Confirm **Startup type** is **Automatic (Delayed Start)** *(adjust if needed and select **OK**)*. Go to **Action > Start**. Confirm **Status** is **Started**. |
   | 2 | **SMA OpCon JORS for SAP** | Open the service. Confirm **Startup type** is **Automatic (Delayed Start)** *(adjust if needed and select **OK**)*. Go to **Action > Start**. Confirm **Status** is **Started**. |
3. Close the **Services** window.

### Stop both services

Stop both services together so processing and output retrieval go offline at the same time.

To stop both services, complete the following steps:

1. Open the Services console — see [Open the Services console](#open-the-services-console).
2. For each service, take the action below:

   | # | Service | Action |
   |---|---|---|
   | 1 | **SMA OpCon Agent for SAP** | Select the service, then go to **Action > Stop**. Confirm **Status** is **Stopped**. |
   | 2 | **SMA OpCon JORS for SAP** | Select the service, then go to **Action > Stop**. Confirm **Status** is **Stopped**. |
3. Close the **Services** window.

### Restart both services

Restart is the safest way to apply non-dynamic SAPLSAM.ini changes or re-establish a stuck connection.

To restart both services, complete the following steps:

1. [Stop both services](#stop-both-services).
2. [Start both services](#start-both-services).

:::note
Restart picks up every change in SAPLSAM.ini, including settings marked **Dynamic: N**. Dynamic settings (marked **Y**) are picked up automatically and do not require a restart. See [Modify the SAPLSAM.ini file](./configuration-file.md#modify-the-saplsamini-file).
:::

## Verify the services are healthy

After starting or restarting:

1. In the **Services** console, both services show **Status: Running** with the expected **Log on as** account.
2. In the **Machines Status** view in the Enterprise Manager, the SAP machine reports communication is up.
3. The agent log (`SAPLSAM.log` under the Output Directory) shows the agent connected to SAP at startup. See [Logging](../advanced-features/logging.md) for log locations.

If any of the three checks fail, see the FAQs below.

## FAQs

**When do I need to restart the SAP Agent service?**
Restart after making non-dynamic changes to SAPLSAM.ini (settings marked **N** in the Dynamic column on the [Configuration file](./configuration-file.md) reference) or after changing the service **Log on as** credentials. Dynamic settings are picked up automatically.

**Why are there two services?**
**SMA OpCon Agent for SAP** processes SAP jobs. **SMA OpCon JORS for SAP** delivers job logs and spool output to the Enterprise Manager.

**What Startup Type does SMA Technologies recommend?**
**Automatic (Delayed Start)** for both services, so they start after dependent system services are ready.

**What happens to in-flight SAP jobs when I stop the agent?**
The agent stops sending status updates to OpCon, but jobs already running on the SAP system continue running. When the agent restarts, it reconnects and resumes monitoring. To avoid surprises, drain SAP work before stopping — see [Drain SAP work](../installation/upgrade-installation.md#drain-sap-work-from-the-agent).

**The agent service won't start. Where do I look first?**
- The Windows Event Log under the Application source for the failure detail.
- `SAPLSAM.log` in the Output Directory for any startup errors logged before the service exited.
- SAPLSAM.ini for lowercase values in **TCP/IP Parameters** or **Debug Options** (both require uppercase) and for duplicate values across multiple instances on the same host. See [Multiple instances](../installation/multiple-instances.md).

**Can I start JORS without starting the agent?**
You can, but JORS has nothing to deliver while the agent is offline. Start both together.

**How do I confirm the agent connected to SAP after starting?**
Look for a successful logon entry in `SAPLSAM.log`. If logon fails, check the SAP system settings (Gateway, Client ID, System Number, encrypted User and Password) in SAPLSAM.ini. See [SAP system settings](./configuration-file.md#sap-system-settings).
