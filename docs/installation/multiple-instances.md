---
sidebar_label: 'Multiple instances'
title: Additional SAP Agent instances
description: "Install or upgrade more than one SAP Agent instance on the same Windows host, including manually managed installs to unique directories."
tags:
  - Procedural
  - System Administrator
  - Installation
---

# Additional SAP Agent instances

## What is it?

Multiple-instance support lets a single Windows host run more than one SAP Agent service so it can connect to multiple SAP systems or partition workload by instance. Each instance has its own service name, socket numbers, and configuration file.

## Choosing an install method

| Method | When to use it | Maintenance overhead |
|---|---|---|
| **Automatic** | Recommended for all new multi-instance deployments. The installer transforms automatically to add another instance. | Low |
| **Manual** | Only if you previously deployed multiple instances by hand and want to keep that pattern. | Higher (manual file copy and service registration) |

Both methods are supported. The automatic install is documented first because it is the recommended path.

:::tip What must be unique per instance
Every instance needs its own unique values for the four settings below. Two of them must match values on the OpCon machine record:

| Agent setting (in SAPLSAM.ini) | Must match this OpCon machine record field |
|---|---|
| **ShortServiceName** | — *(local to the host)* |
| **DisplayServiceName** | — *(local to the host)* |
| **SocketNumberToSAM** | **Socket Number** |
| **JORSSocket** | **JORS Port Number** |
:::

## Before you begin

| Check | Why it matters |
|---|---|
| The first SAP Agent is installed and working | The automatic installer adds an additional instance to an existing install. The manual procedure copies files from the first instance. |
| Picked unique values for the new instance | You will need a unique service short name, display name, **SocketNumberToSAM**, and **JORSSocket**. |
| Allocated SAP connection details for the new instance | If the new instance connects to a different SAP system, have the SAP **Client ID**, **Gateway**, **System Number**, **User**, and **Password** ready. |
| Have local administrator credentials on the Windows host | Required to register a new Windows service. |

---

## Automatic install: add another instance

This is the recommended path for any new multi-instance deployment.

### Run the installer for the new instance

If additional SAP Agents are needed after installing the initial agent, repeat [Run the installer](./new-installation.md#run-the-installer). The installation package automatically transforms to install new instances of the agent.

### Create the matching machine in OpCon

After installing each new instance, define a new machine in OpCon with a unique name and port number using the [Create the machine in OpCon](./new-installation.md#create-the-machine-in-opcon) procedure.

---

## Manual install: add another instance

Use this section only if you previously installed additional SAP Agents to unique directories by hand and want to continue using that method. SMA Technologies supports this method, but it has higher maintenance overhead than the automatic path.

### High-level steps (manual install)

| Phase | What you do | Goes to |
|---|---|---|
| 1 | Create directories for the new instance | [Create the new instance directories](#create-the-new-instance-directories) |
| 2 | Copy the first instance's files into the new directories | [Copy required files](#copy-required-files) |
| 3 | Edit the new instance's SAPLSAM.ini for unique values | [Modify the new agent's configuration file](#modify-the-new-agents-configuration-file) |
| 4 | Register and start the new Windows service | [Register the new agent as a service and start](#register-the-new-agent-as-a-service-and-start) |
| 5 | Create the matching machine record in OpCon | [Create the machine in OpCon (manual install)](#create-the-machine-in-opcon-manual-install) |

### Create the new instance directories

Each manually installed instance needs its own program files directory and configuration directory. Use the same name for both so they are easy to associate.

To create the new instance directories, complete the following steps:

1. On the application server, right-click the **Start** button and select **Explore**.
2. Browse to the OpConxps `<Target Directory>` in the explorer window.
3. Go to **File > New > Folder** and name it `SAP LSAM <custom directory>` (for example, `SAPLSAM13200`).
4. Browse to the OpConxps `<Configuration Directory>`.
5. Go to **File > New > Folder** and give it the same name as the program files directory (for example, `SAPLSAM13200`).

### Copy required files

To copy the required files, complete the following steps:

1. In the explorer window, copy the contents of each source directory into the matching new directory:

   | # | From | To |
   |---|---|---|
   | 1 | First agent's `<Target Directory>` | New agent's `<Target Directory>` |
   | 2 | First agent's `<Configuration Directory>` | New agent's `<Configuration Directory>` |
2. For each pair, use **Edit > Select All**, **Edit > Copy** in the source, then **Edit > Paste** in the destination.

### Modify the new agent's configuration file

Edit SAPLSAM.ini in the new instance to give it the unique values it needs and the connection information for its SAP system.

To modify the configuration file, complete the following steps:

1. Browse to `<Configuration Directory>\<custom directory>\` in the explorer window.
2. Right-click **SAPLSAM.ini** and select **Open With**.
3. Select an ASCII text editor (for example, Notepad) from the menu.
4. Set the unique-per-instance values:

   | Setting | Section | What to set |
   |---|---|---|
   | **ShortServiceName** | General Settings | A unique internal service name for this instance. |
   | **DisplayServiceName** | General Settings | A unique display name for the Service Control Manager. |
   | **SocketNumberToSAM** | TCP/IP Parameters | A unique port number. Must match the OpCon machine record's **Socket Number**. |
   | **JORSSocket** | JORS Settings | A unique port number. Must match the OpCon machine record's **JORS Port Number**. |
5. Configure the connection information for the SAP system. See [SAP system settings](../administration/configuration-file.md#sap-system-settings).
6. Go to **File > Save**.
7. Close the **Explorer** window.

### Register the new agent as a service and start

Each manually installed instance needs to be registered as a Windows service before Windows can start it.

To register and start the new instance, complete the following steps:

1. Select **Start** and enter `cmd` in the search box to open a command window.
2. Change the directory to the new agent's directory.
3. Run the following command:

   ```console
   regsvc.cmd -install
   ```
4. Close the command window.
5. Go to **Start > Administrative Tools > Server Manager**.
6. Expand (**+**) the **Configuration** option in the Administrative Tools window.
7. Select the **Services** entry.
8. In the **Services** list, select the new instance's **DisplayServiceName**.
9. Go to **Action > Start**.
10. Confirm the *Service's* **Status** is **Started**.

### Create the machine in OpCon (manual install)

When a SAP Agent is installed, create a machine record with a unique **Machine name** and **Socket number** in OpCon. If the machine was previously defined in OpCon, skip this procedure.

:::note Solution Manager
If you use Solution Manager, go to **Library > Agents** and select **+ Add** to create the machine record. Set the **Socket Number** on the **General** tab.
:::

#### Log on to the Enterprise Manager

To log on to the Enterprise Manager, complete the following steps:

1. Go to **Start > Programs > OpConxps > Enterprise Manager**. The **OpCon Login** screen displays.
2. In the **Username** field, enter a *case-sensitive User Login ID* (for example, `ocadm`).
3. In the **Password** field, enter the *case-sensitive password* for the user.
4. In the **Profile** list, select the *Profile*.
5. Select **Login** to log on to the Enterprise Manager.

#### Add the SAP machine record

To add the SAP machine record, complete the following steps:

1. Open **Machines** in the **Navigation** panel under **Administration**.
2. Select **Add** on the **Machines** toolbar.
3. Enter the values shown in the table below.

   | Field | Required | What to enter |
   |---|---|---|
   | Name | Yes | The official host name or alias of the agent machine. |
   | Documentation | No | Any relevant documentation for this agent machine. |
   | Machine Type | Yes | **SAP** |
   | Socket Number | Yes | A unique number (for example, `13200`). Must match **SocketNumberToSAM** in the new instance's SAPLSAM.ini. |
   | IP Address | No | The IPv4 or IPv6 address. |
   | Fully Qualified Domain Name | No | The FQDN of the agent machine. |
4. Select **Save** on the **Machines** toolbar.

#### Configure the SAP Settings tab

To configure the SAP Settings tab, complete the following steps:

1. Select **Open Advanced Settings Panel** under **Advanced Settings**. The **Advanced Machine Properties** window displays.
2. Select the **SAP Settings** tab.
3. For each parameter below, configure the value and select **Update**:

   | Parameter | What to set |
   |---|---|
   | Client ID | The SAP Client ID for the SAPQueryProcessor to connect to the SAP system. |
   | Gateway | The full connection string for the SAPQueryProcessor to connect to the SAP system. |
   | System Number | The system number for the SAPQueryProcessor to connect to the SAP system. |
   | RFC Trace *(optional)* | **On** if the SAP RFC trace for the SAPQueryProcessor message requests should be turned on. |
4. Select **Save**.

#### Start communication with the machine *(optional)*

To start communication with the machine, complete the following steps:

1. Right-click the graphic in the **Communication Status** frame to enable the menu.
2. Select **Start Communication** from the menu.
3. Close the **Machines** screen.

---

## Automatic upgrade: upgrade all instances

If you installed multiple instances of the SAP Agent from a distribution prior to 15.0, complete [Upgrade installation](./upgrade-installation.md) for each instance. The installation package automatically transforms to upgrade each instance.

---

## Manual upgrade: upgrade an additional instance

A manual upgrade is required for each additional agent that was manually installed to a unique directory. After upgrading the first SAP Agent from the DVD installation, complete the steps in this section for each additional manually installed agent.

### High-level steps (manual upgrade)

| Phase | What you do | Goes to |
|---|---|---|
| 1 | Drain SAP work and stop both services | [Stop running work and services (manual upgrade)](#stop-running-work-and-services-manual-upgrade) |
| 2 | Copy upgrade files from the first instance to the additional instance | [Copy upgrade files](#copy-upgrade-files) |
| 3 | Compare the new SAPLSAM.ini template with your existing one and merge new settings | [Confirm the additional agent's configuration settings](#confirm-the-additional-agents-configuration-settings) |
| 4 | Restart the service and resume communication | [Restart and resume communication (manual upgrade)](#restart-and-resume-communication-manual-upgrade) |

### Stop running work and services (manual upgrade)

Before copying upgrade files, drain SAP work from this instance and stop both of its services.

#### Drain SAP work from the instance

To drain SAP work, complete the following steps:

1. Open **Machines Status** under the **Operation** topic. The **Machines Status** screen displays.
2. Confirm **Running Jobs** is `0/<max>` for the SAP machine.
3. If running jobs exist, contact the OpCon administrator to choose one of the following:

   | Option | What happens |
   |---|---|
   | Wait for the processes to end | Jobs finish naturally. Recheck **Running Jobs** until it shows `0/<max>`. |
   | Kill the processes on the SAP side | See [Kill command](../advanced-features/kill-command.md). Recheck **Running Jobs** after each kill. |
4. Right-click the machine and select **Stop Communication** from the menu.

#### Stop the agent and JORS services

To stop both services for this instance, complete the following steps:

1. On the Application server, go to **Start > Administrative Tools > Server Manager**. The **Administrative Tools** window displays.
2. Expand (**+**) the **Configuration** option.
3. Select the **Services** entry. The **Services** window displays.
4. Stop each service in the order shown:

   | # | Service | Action |
   |---|---|---|
   | 1 | This instance's **DisplayServiceName** *(agent)* | Select the service, then go to **Action > Stop**. Confirm **Status** is **Stopped**. |
   | 2 | This instance's JORS service | Select the service, then go to **Action > Stop**. Confirm **Status** is **Stopped**. |
5. Close the **Services** window.
6. Repeat this procedure for each manually installed instance on the machine.

### Copy upgrade files

To copy the upgrade files, complete the following steps:

1. In the explorer window, browse to the first (already-upgraded) SAP Agent's directory.
2. Go to **Edit > Select All**, then **Edit > Copy**.
3. Browse to the additional SAP Agent directory.
4. Go to **Edit > Paste**.

### Confirm the additional agent's configuration settings

After copying the upgraded program files, compare the new SAPLSAM.ini template with this instance's existing SAPLSAM.ini and merge any new settings forward.

To confirm the additional agent's configuration settings, complete the following steps:

1. Open both files in an ASCII text editor:

   | File | Where it lives | Role |
   |---|---|---|
   | `SAPLSAM.ini` | This instance's `<Configuration Directory>\SAP LSAM\` | Your existing settings — keep these. |
   | `NewSAPLSAM.ini` | First SAP Agent's `<Configuration Directory>` (copied into this instance's directory) | The template from the new version — read this for any new settings. |
2. Compare the two files side by side. For each new setting in `NewSAPLSAM.ini` that does not appear in your existing `SAPLSAM.ini`, copy it forward and set an appropriate value.
3. Save your existing `SAPLSAM.ini`.

For complete information on each setting, see [SAPLSAM.ini configuration file](../administration/configuration-file.md).

### Restart and resume communication (manual upgrade)

After merging settings, restart the service and tell OpCon to resume communication.

#### Restart the service

To restart the service, complete the following steps:

1. On the Application server, go to **Start > Administrative Tools > Server Manager**. The **Administrative Tools** window displays.
2. Expand (**+**) the **Configuration** option.
3. Select the **Services** entry. The **Services** window displays.
4. In the **Services** list, select this instance's **DisplayServiceName**.
5. Go to **Action > Start**.
6. Confirm the *Service's* **Status** is **Started**.

:::tip
Repeat for this instance's JORS service so output retrieval is also available.
:::

#### Start communication with the agent

To start communication with the agent, complete the following steps:

1. Open **Machines Status** under the **Operation** topic. The **Machines Status** screen displays.
2. Right-click the machine and select **Start Communication** from the menu.

---

## Verify each instance

After installing or upgrading multiple instances, verify each instance independently.

For every instance:

1. In the Windows **Services** console, confirm the instance's two services (the agent and its JORS service) are running.
2. In the **Machines Status** view in the Enterprise Manager (or the **Operations** view in Solution Manager), confirm the matching machine record reports communication is up.
3. In that instance's `SAPLSAM.log` (under its Output Directory), confirm it connected to the correct SAP system. See [Logging](../advanced-features/logging.md) for log locations.
4. Submit a low-impact test job to the matching OpCon machine to confirm end-to-end execution on that instance.

## FAQs

**When would I run more than one SAP Agent on the same machine?**
Common reasons include connecting to multiple SAP systems from a single Windows host, or partitioning workload (for example, separating production and test traffic) so each agent has its own configuration, ports, and service.

**What must be unique per instance?**
Each instance must have a unique **ShortServiceName**, **DisplayServiceName**, **SocketNumberToSAM**, and **JORSSocket**. The OpCon machine record's **Socket Number** must match the agent's **SocketNumberToSAM**, and the machine record's **JORS Port Number** must match the agent's **JORSSocket**.

**Why does SMA Technologies still support the manual install method?**
The manual method exists to support customers who deployed multiple instances using earlier procedures. The automatic install is the recommended approach because it has lower maintenance overhead.

**Can I mix automatic and manual instances on the same host?**
Yes, but each instance — regardless of how it was installed — still needs unique service names and socket numbers. Use the verification checklist on each instance after install or upgrade.

**Do I need a separate OpCon machine record for every instance?**
Yes. Each instance needs its own machine record in OpCon with its own **Socket Number** and **JORS Port Number** that match the agent's values.

**What is `regsvc.cmd`?**
`regsvc.cmd -install` is the small batch file shipped with the SAP Agent that registers the program files in the current directory as a Windows service. The manual install procedure uses it because there is no installer to do the registration automatically.

**What is `NewSAPLSAM.ini`?**
A template configuration file shipped with the upgraded program files. During a manual upgrade, you compare it against your existing `SAPLSAM.ini` and copy forward any new settings introduced by the upgrade.
