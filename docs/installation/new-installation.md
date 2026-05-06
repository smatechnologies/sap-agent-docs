---
sidebar_label: 'New installation'
title: SAP Agent new installation
description: "Install the SAP Agent on a Windows host, configure the service startup, and create the matching SAP machine record in OpCon."
tags:
  - Procedural
  - System Administrator
  - Installation
---

# New installation

## What is it?

A new installation puts the SAP Agent on a Windows host for the first time. This page walks you through three phases: running the installer, configuring how the agent service starts, and creating the SAP machine definition in OpCon so OpCon can communicate with the agent.

## Before you begin

| Check | Why it matters |
|---|---|
| [SAP Agent installation prerequisites](./prerequisites.md) are met | The agent can't connect to SAP without XBP 2.0 and the right authorization roles. |
| [Installation media](./determine-installation-media.md) is on the local hard drive | Running the installer over a network or removable drive risks partial reads. |
| You have local administrator credentials on the Windows host | The installer needs them to register services and write to Program Files. |
| You've decided how the agent service will run | **Local System** is the default. Use a domain user only if the agent needs network drive access. |

## High-level steps

| Phase | What you do | Goes to |
|---|---|---|
| 1 | Run the installer | [Run the installer](#run-the-installer) |
| 2 | Configure how the agent service starts | [Set up service startup](#set-up-service-startup) |
| 3 | Create the SAP machine record in OpCon | [Create the machine in OpCon](#create-the-machine-in-opcon) |
| 4 | Verify the install | [Verify the install](#verify-the-install) |

## Run the installer

The OpCon installer is a standard InstallShield wizard. The first three steps below get you to the wizard; the table after lists every screen and what to do on each.

### Launch the installer

To launch the installer, complete the following steps:

1. Log on to the Windows machine as a Local Administrator.
2. Exit all running applications on the desktop (including OpCon applications).
3. Run **setup.exe** from the root of the OpCon installation media.

The **Choose Setup Language** screen displays.

### Walk through the wizard screens

For each screen the wizard shows, take the action in the table below. Defaults are safe for most installs; the table calls out the screens where you might need to change a value.

| # | Screen | What to do |
|---|---|---|
| 1 | Choose Setup Language | Select the language and select **Next**. |
| 2 | Welcome | Select **Next**. |
| 3 | Select Components | Select **SMA OpCon Agents > SMA OpCon Agent for SAP**. Select **Install**. |
| 4 | Welcome *(component installer)* | Select **Next**. |
| 5 | Destination Folder | Change the target location or retain the default. Select **Next**. |
| 6 | Configure Instance Name | *(Optional)* Enter a unique instance name. Select **Next**. |
| 7 | Select Path for File Migration to ProgramData | Select **Skip** *(new installs only)*. |
| 8 | Select Path for Output Files | Change the output directory or retain the default. Select **Next**. |
| 9 | Configure Ports | Change the values or retain the defaults. Select **Next**. |
| 10 | Setup Type | Select **Complete** or **Custom**. Select **Next**. *(For Custom, the **Custom Setup** screen displays next; otherwise the wizard skips it.)* |
| 11 | Ready to Install the Program | Select **Install**. |
| 12 | InstallShield Wizard Completed | Select **Finish**. |

:::note Need to roll back?
If the install fails, the installer writes `SMA_OpCon_SAP_LSAM_Install.log` to the Windows directory. Open that file first.
:::

### After the install

When the wizard finishes, two new Windows services are present:

| Service | Role |
|---|---|
| SMA OpCon Agent for SAP | The agent itself. Talks to OpCon and SAP. |
| SMA OpCon JORS for SAP | The Job Output Retrieval System. Delivers job logs and spool output to the Enterprise Manager. |

Both services default to **Automatic (Delayed Start)** running under the **Local System** account. To change either default, continue with [Set up service startup](#set-up-service-startup).

## Set up service startup

By default, the SAP Agent service is set to **Automatic (Delayed Start)** and runs under the **Local System** account. Use the procedures in this section if either default needs to change.

:::tip
SMA Technologies recommends keeping the SMA OpCon Agent for SAP service set to **Automatic (Delayed Start)** so it starts after dependent system services are ready.
:::

### Open the service properties

To open the service properties, complete the following steps:

1. On the Application server, go to **Start > Control Panel > Administrative Tools**.
2. Open the **Services** entry. The **Services** window displays.
3. Open the newly installed **SMA OpCon Agent for SAP** service. The **SMA OpCon Agent for SAP Properties** dialog displays with the **General** tab in focus.

Leave this dialog open while you complete the procedures below.

### Change the startup type

To change the startup type, complete the following steps:

1. On the **General** tab, select the **Startup type** list.
2. Select one of the following options:

   | Option | When to use it |
   |---|---|
   | Automatic (Delayed Start) | Recommended. Service starts after other services are ready. |
   | Automatic | Service starts at boot, in parallel with other services. |
   | Manual | Service must be started by an administrator. |
   | Disabled | Service cannot start. |
3. Select **OK**.

### Change the Log on as account

To change the **Log on as** account, complete the following steps:

1. Select the **Log On** tab.
2. Select one of the following options:

   | Option | When to use it |
   |---|---|
   | Local System account | The service does not need access to network resources outside the local machine. |
   | This account | The service needs access to network drives, shares, or other domain resources. Enter the *Domain User*, *Password*, and confirm the *Password*. |
3. Select **OK**.

## Create the machine in OpCon

When a SAP Agent is installed, create a machine record in OpCon with a unique **Machine name** and **Socket number**. If the machine was previously defined in OpCon, skip this procedure.

### Log on to the Enterprise Manager

To log on to the Enterprise Manager, complete the following steps:

1. Go to **Start > Programs > OpConxps > Enterprise Manager**. The **OpCon Login** screen displays.
2. In the **Username** text box, enter a *case-sensitive User Login ID* (for example, `ocadm`).
3. In the **Password** text box, enter the *case-sensitive password* for the user.
4. In the **Profile** list, select the *Profile*.
5. Select **Login** to log on to the Enterprise Manager.

### Add the SAP machine record

To add the SAP machine record, complete the following steps:

1. Open **Machines** under the **Administration** topic in the **Navigation Panel**. The **Machines** screen displays.
2. Select **Add** on the **Machines** toolbar.
3. Enter the values shown in the table below.

   | Field | Required | What to enter |
   |---|---|---|
   | Name | Yes | The official host name or alias of the agent machine. |
   | Documentation | No | Any relevant documentation for this agent machine. |
   | Machine Type | Yes | **SAP** |
   | Socket Number | Yes | A unique number (for example, `13100`). Must match **SocketNumberToSAM** in SAPLSAM.ini — see [TCP/IP parameters](../administration/configuration-file.md#tcpip-parameters). |
   | IP Address | No | The IPv4 or IPv6 address of the agent machine. |
   | Fully Qualified Domain Name | No | The FQDN of the agent machine. |

4. Select **Save** on the **Machines** toolbar.

### Start communication with the machine *(optional)*

To start communication with the machine, complete the following steps:

1. Right-click over the graphic in the **Communication Status** frame to enable the menu.
2. Select **Start Communication** from the menu.
3. Close the **Machines** screen.

## Verify the install

To confirm the install succeeded:

1. In the Windows **Services** console, confirm both **SMA OpCon Agent for SAP** and **SMA OpCon JORS for SAP** are running. See [Managing the SAP Agent](../administration/manage-lsam.md) if either service is not started.
2. In the **Machines Status** view in the Enterprise Manager, confirm the new SAP machine reports communication is up.
3. In the agent log (`SAPLSAM.log` under the Output Directory), confirm the agent connected to SAP. See [Logging](../advanced-features/logging.md) for log locations.

If any of the three checks fail, see the FAQs below or [Configuration file](../administration/configuration-file.md) to verify your SAPLSAM.ini settings.

## FAQs

**Do I need to uninstall a previous version of the agent before running a new install?**
No, unless you are upgrading from the 32-bit SAP LSAM and want to reuse the same install location. Otherwise, run an [upgrade installation](./upgrade-installation.md) instead.

**Where does the installer write its log?**
`SMA_OpCon_SAP_LSAM_Install.log` in the Windows directory.

**Why does SMA Technologies recommend Automatic (Delayed Start)?**
Delayed Start avoids race conditions at boot time when other services and programs are still starting up.

**Where do I configure the connection to SAP after the install completes?**
Connection details live in `SAPLSAM.ini`. See the [Configuration file](../administration/configuration-file.md) reference and the [Encrypt SAP credentials](../administration/configuration-file.md#encrypt-sap-credentials-in-saplsamini) procedure.

**Which port values does the installer ask for?**
The **Configure Ports** screen sets the agent's main socket and the JORS socket. Defaults are safe for single-instance installs. For multiple agents on the same host, see [Multiple instances](./multiple-instances.md).

**The installer didn't ask me about a previous installation. Why?**
The **Select Path for File Migration to ProgramData** screen is the migration prompt. On a new install you select **Skip** there; on an upgrade you point it at the previous install directory so settings are migrated forward.
