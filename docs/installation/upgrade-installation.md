---
sidebar_label: 'Upgrade installation'
title: SAP Agent upgrade installation
description: "Upgrade an existing SAP Agent install, including 32-bit to 64-bit transitions and the proxy migration introduced in 19.1.0."
tags:
  - Procedural
  - System Administrator
  - Upgrade
---

# Upgrade installation

## What is it?

An upgrade moves an existing SAP Agent install to a newer release while preserving its configuration. You drain SAP work from the agent, stop the services, optionally uninstall the previous version, run the new installer, and restart the services so OpCon can resume submitting SAP work to the agent.

## Before you begin

| Check | Why it matters |
|---|---|
| Read the [Release notes](../release-notes.md) for the target version | Some versions introduce required behavior changes (see the version notes below). |
| Capture the **Log on as** account and password for each service | The installer does not migrate this; you reapply it after the install. |
| If multiple agents run on the same host, plan to repeat per instance | See [Multiple instances](./multiple-instances.md) for the per-instance procedure. |
| Confirm where SAPLSAM.ini lives | The installer asks you to point at the previous install directory so settings can be migrated. |

### Version notes

:::danger 19.1.0 — SAP proxy moved to the agent
As of Release 19.1.0, the SAP Agent acts as the SAP system proxy. Before 19.1.0, this proxy lived in the OpCon server, which no longer provides the functionality.

Customers who run a SAP Agent must upgrade their agents to 19.1.0 when they install OpCon 19.1.0 so that the SAP proxy functionality is available.
:::

:::warning 16.1 — 32-bit to 64-bit transition
With Release 16.1, the SAP Agent was converted from 32-bit to 64-bit.

- **To keep the previous install location**: uninstall the 32-bit version first, then install the 64-bit version.
- **To install side by side**: install the 64-bit version to a new location; the 32-bit version is unaffected.
:::

:::warning Multi-instance from release 5.20
Upgrading the base instance automatically removes additional instances. Run the SAP Agent installation again, once per instance, after the base install completes.
:::

## High-level steps

| Phase | What you do | Goes to |
|---|---|---|
| 1 | Drain SAP work and stop the agent's two services | [Stop running work and services](#stop-running-work-and-services) |
| 2 | *(Optional)* Uninstall the previous SAP Agent if reusing the install location | [Remove the SAP Agent](#remove-the-sap-agent) |
| 3 | Run the installer for the new version | [Run the installer](#run-the-installer) |
| 4 | *(Optional)* Delete the old install directory after verifying the upgrade | [Delete the old SAP Agent directory](#delete-the-old-sap-agent-directory) |
| 5 | Restart services and resume communication | [Restart and resume communication](#restart-and-resume-communication) |
| 6 | Verify the upgrade | [Verify the upgrade](#verify-the-upgrade) |

## Stop running work and services

Before running the installer, drain SAP work from the agent and stop both services. Repeat this phase for each agent instance on the host.

### Drain SAP work from the agent

To drain SAP work, complete the following steps:

1. Open **Machines Status** under the **Operation** topic. The **Machines Status** screen displays.
2. Confirm **Running Jobs** is `0/<max>` for the SAP machine.
3. If running jobs exist, contact the OpCon administrator to choose one of the following:

   | Option | What happens |
   |---|---|
   | Wait for the processes to end | Jobs finish naturally. Recheck **Running Jobs** until it shows `0/<max>`. |
   | Kill the processes on the SAP side | See [Kill command](../advanced-features/kill-command.md). Recheck **Running Jobs** after each kill. |
4. Right-click the machine and select **Stop Communication** from the menu.

### Stop the agent and JORS services

To stop both services, complete the following steps:

1. On the Application server, go to **Start > Administrative Tools > Server Manager**. The **Administrative Tools** window displays.
2. Expand (**+**) the **Configuration** option.
3. Select the **Services** entry. The **Services** window displays.
4. Stop each service in the order shown:

   | # | Service | Action |
   |---|---|---|
   | 1 | SMA OpCon Agent for SAP | Select the service, then go to **Action > Stop**. Confirm **Status** is **Stopped**. |
   | 2 | SMA OpCon JORS for SAP | Select the service, then go to **Action > Stop**. Confirm **Status** is **Stopped**. |
5. Close the **Services** window.
6. Repeat this procedure for each instance of the agent on the machine.

## Remove the SAP Agent

:::note
Skip this phase unless you are upgrading from the 32-bit version and want to reuse the same install location. Go to [Run the installer](#run-the-installer).
:::

To remove the SAP Agent, complete the following steps:

1. Go to **Start > Control Panel**. The **Control Panel** window opens.
2. Open the **Programs and Features** entry. The **Programs and Features** window displays.
3. Select the **SMA Agent for SAP** program.
4. Take the action that matches your install:

   | Install | Action |
   |---|---|
   | Single instance | Select **Uninstall** in the toolbar. The uninstall runs automatically. |
   | Multiple instances | Select **Change** in the toolbar and continue with the wizard below. |
5. *(Multiple instances only)* Walk through the **Change** wizard:

   | # | Screen | What to do |
   |---|---|---|
   | 1 | Welcome | Select **Next**. |
   | 2 | Program Maintenance | Select the **Remove** radio button. Select **Next**. |
   | 3 | Remove the Program | Select **Remove**. If the wizard prompts for a reboot, accept and restart when the wizard finishes. |
   | 4 | InstallShield Wizard Completed | Select **Finish**. |

## Run the installer

The OpCon installer is a standard InstallShield wizard. The first three steps below get you to the wizard; the table after lists every screen and what to do on each. The upgrade flow differs from a new install at one screen — **Select Path for File Migration to ProgramData** — where you point the installer at your previous install directory so its settings are migrated forward.

### Launch the installer

To launch the installer, complete the following steps:

1. On the machine requiring the SAP Agent, log on as a Windows user with Local Administrative Rights.
2. Exit all running applications on the desktop (including OpCon applications).
3. Run **setup.exe** from the root of the OpCon installation media.

The **Choose Setup Language** screen displays.

### Walk through the wizard screens

For each screen the wizard shows, take the action in the table below. The **File Migration to ProgramData** row is what makes this an upgrade rather than a new install.

| # | Screen | What to do |
|---|---|---|
| 1 | Choose Setup Language | Select the language and select **Next**. |
| 2 | Welcome | Select **Next**. |
| 3 | Select Components | Select **SMA OpCon Agents > SMA OpCon Agent for SAP**. Select **Install**. |
| 4 | Welcome *(component installer)* | Select **Next**. |
| 5 | Destination Folder | Change the target location or retain the default. Select **Next**. |
| 6 | Configure Instance Name | *(Optional)* Enter a unique instance name. Select **Next**. |
| 7 | Select Path for File Migration to ProgramData | **Browse to the previous install directory** so the installer can migrate existing configuration files. Select **Next**. |
| 8 | Select Path for Output Files | Change the output directory or retain the default. Select **Next**. |
| 9 | Configure Ports | Change the values or retain the defaults. Select **Next**. |
| 10 | Setup Type | Select **Complete** or **Custom**. Select **Next**. *(For Custom, the **Custom Setup** screen displays next; otherwise the wizard skips it.)* |
| 11 | Ready to Install the Program | Select **Install**. |
| 12 | InstallShield Wizard Completed | Select **Finish**. |

### Reapply the service Log on as account

After the installer finishes, reapply the **Log on as** account you captured in [Before you begin](#before-you-begin). See [Change the Log on as account](./new-installation.md#change-the-log-on-as-account).

:::note Need to roll back?
If the install fails, the installer writes `SMA_OpCon_SAP_LSAM_Install.log` to the Windows directory. Open that file first.
:::

## Delete the old SAP Agent directory

After the install completes and you have verified your upgraded environment, you can delete the previous SAP Agent directory.

:::caution
Only delete the old directory after [Verify the upgrade](#verify-the-upgrade) succeeds — the previous directory is your fastest rollback if the new install does not work.
:::

To delete the old SAP Agent directory, complete the following steps:

1. Right-click the **Start** button.
2. Select **Explore** from the menu.
3. Browse to the old SAP Agent directory in the explorer window.
4. Select the **"0"** folder.
5. Go to **File > Delete**.
6. Select **OK** to **Confirm File Delete**.
7. Close the **Explorer** window.

## Restart and resume communication

After the install completes and the **Log on as** account is reapplied, restart the services and tell OpCon to resume communication with the agent.

### Restart the agent service

To restart the agent service, complete the following steps:

1. On the Application server, go to **Start > Administrative Tools > Server Manager**. The **Administrative Tools** window displays.
2. Expand (**+**) the **Configuration** option.
3. Select the **Services** entry. The **Services** window displays.
4. In the **Services** list, select **SMA OpCon Agent for SAP**.
5. Go to **Action > Start**.
6. Confirm the *Service's* **Status** is **Started**.

:::tip
Repeat for **SMA OpCon JORS for SAP** so output retrieval is also available. See [Managing the SAP Agent](../administration/manage-lsam.md) for the full start procedure.
:::

### Start communication with the SAP Agent

To start communication, complete the following steps:

1. Open **Machines Status** under the **Operation** topic. The **Machines Status** screen displays.
2. Right-click the machine and select **Start Communication** from the menu.

## Verify the upgrade

To confirm the upgrade succeeded:

1. In the Windows **Services** console, confirm both **SMA OpCon Agent for SAP** and **SMA OpCon JORS for SAP** are running.
2. In the **Machines Status** view in the Enterprise Manager, confirm the SAP machine reports communication is up.
3. In the agent log (`SAPLSAM.log` under the Output Directory), confirm the agent connected to SAP and the version number matches the upgrade target. See [Logging](../advanced-features/logging.md) for log locations.
4. Submit a low-impact test job to confirm end-to-end job execution.

If any of the four checks fail, see the FAQs below or [Configuration file](../administration/configuration-file.md) to verify your SAPLSAM.ini settings.

## FAQs

**Do I need to uninstall the existing SAP Agent before upgrading?**
Only if you are upgrading from the 32-bit version and want to keep the same install location. Otherwise, install the new version to a different location and the previous install is unaffected.

**What changed in 19.1.0 that requires the agent to be upgraded?**
As of 19.1.0, the SAP Agent itself acts as the SAP system proxy. The OpCon server no longer provides that functionality, so customers running a SAP Agent must upgrade to 19.1.0 when they install OpCon 19.1.0.

**What happens to additional instances during an upgrade from release 5.20?**
Upgrading the base instance automatically removes additional instances. Run the SAP Agent installation once per instance after the base install completes.

**Where can I find the installer log if the upgrade fails?**
`SMA_OpCon_SAP_LSAM_Install.log` is written to the Windows directory by the installer.

**Why does the upgrade procedure prompt for the previous install path?**
The **Select Path for File Migration to ProgramData** screen tells the installer where your previous install directory is so existing configuration files (including SAPLSAM.ini) are migrated forward. On a new install you would select **Skip** here; on an upgrade you point it at the previous directory.

**What if I forget to capture the Log on as account before upgrading?**
The installer does not migrate the **Log on as** credentials. If you don't have them, the agent service will fail to start under a domain account after the upgrade. Recover the credentials from your password manager or your domain administrator before completing the upgrade.

**Can I run the new agent and the old install side by side temporarily?**
Yes — install the new version to a different directory. The previous install is unaffected and can be removed later via [Delete the old SAP Agent directory](#delete-the-old-sap-agent-directory) once the upgrade is verified.
