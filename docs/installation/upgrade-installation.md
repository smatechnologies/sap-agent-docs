# Upgrade installation

With Release 16.1, the SAP LSAM was converted to 64-bit from 32-bit. To upgrade to the 64-bit version while maintaining the previous installation location, the 32-bit version LSAM must be uninstalled before installing the 64-bit version LSAM. Alternatively, the 64-bit version can be installed to a new location and the 32-bit version will not be impacted.

:::danger
As of Release 19.1.0, the SAP LSAM will now act as an SAP system proxy. Before 19.1.0, this SAP proxy functionality was available in the OpCon server. Now, the OpCon server will no longer provide this functionality.

Customers who run an SAP LSAM must upgrade their LSAMs to 19.1.0 (when installing OpCon 19.1.0) so that the SAP proxy functionality will be available to them.
:::

:::caution
Before proceeding, check the services settings for "Log on as" in the service's properties. If any of the services log on as a domain user with password, make sure you have the password before proceeding with the upgrade. If multiple instances of the LSAM are installed on the machine, be sure to note this information for every instance.
:::

## Check for running jobs

1. Double-click on **Machines Status** under the **Operation** topic. The **Machines Status** screen displays.
2. Confirm the number of running jobs is **0** for the SAP machine.
3. If running jobs exists, contact the OpCon administrator if you should:
    a.  Wait for the processes to end **- or -**
    b.  **Kill** the processes on the SAP side. For more information, refer to [Kill Command](../advanced-features/kill-command.md).
4. Repeat steps 3 a) or b) until the **Machines Status** screen  indicates **Running Jobs** of **0/<max\>**.
5. Right-click the machine and select **Stop Communication** from the menu.

## Stop the service

1. Use the following menu path on the Application server: **Start \> Administrative Tools \> Server Manager**. The **Administrative Tools** window displays.
2. Expand (**+**) the **Configuration** option.
3. Click the **Services** icon. The **Services** window displays.
4. In the **Services** list, select **SMA OpCon Agent for SAP**.
5. Use menu path: **Action \> Stop**.
6. Confirm the *Service\'s* **Status** is **Stopped**.

## Stop the JORS service

1. In the **Services** list, select **SMA OpCon JORS for SAP**.
2. Use menu path: **Action \> Stop**.
3. Confirm the *Service\'s* **Status** is **Stopped**.
4. Close the **Services** window.
5. Repeat this procedure for each instance of the LSAM     on the machine.

## Remove the SAP LSAM

:::note
If you do not wish to uninstall an existing 32-bit SAP LSAM, skip the steps in this section and proceed to [Install the SAP LSAM](#install-the-sap-lsam).
:::

1. Use menu path: **Start \> Control Panel**. The **Control Panel** window opens.
2. Double-click the **Programs and Features** icon. The **Programs and Features** window displays.
3. Select the **SMA Agent for SAP** program.
4. If only one instance is installed, click the **Uninstall** button in the toolbar and the program will be automatically uninstalled. If multiple instances are installed, proceed to step 5.
5. Click the **Change** button in the toolbar. The **Welcome** screen displays.
6. Click **Next**. The **Program Maintenance** screen displays.
7. Select the **Remove** radio button.
8. Click **Next**. The **Remove the Program** screen displays.
9. Click **Remove**. If the **InstallShield Wizard** prompts that a reboot will be required, select the option to continue and restart your computer once the wizard finishes.
10. Click **Finish** on the **InstallShield Wizard Completed** screen.

## Install the SAP LSAM

:::warning
If you are upgrading multi-instance installs of the LSAM from release 5.20, upgrading the base instance will automatically remove the additional instances. Make sure to run the SAP LSAM installation again, once for each instance of the LSAM on the machine.
:::

1. On the machine requiring the SAP LSAM, log in as a Windows user with Local Administrative Rights.
2. Exit all running applications on the desktop (including OpCon applications).
3. Double-click the **setup**.exe on the root of the OpCon installation media. The **Choose Setup Language** screen displays.
4. Select the desired language for the installation screens and click **Next**. The **Welcome** screen displays.
5. Click **Next**. The **Select Components** screen displays.
6. Select **SMA OpCon Agents \> SMA OpCon Agent for SAP**.
7. Click **Install**. The **Welcome** screen displays.
8. Click **Next**. The **Destination Folder** screen displays.
9. Change the target location for the installation or retain the default location.
10. Click **Next**. The **Configure Instance Name** screen displays.
11. *(Optional)* Enter a unique instance name by which to identify the SAP LSAM.
12. Click **Next**. The **Select Path for File Migration to ProgramData** screen displays.
13. Enter or browse to (and select) the path to a previous install directory to have the installer search for any previously installed configuration files in that location and migrate them to the new directory.
14. Click **Next**. The **Select Path for Output Files** screen displays.
15. Change the directory for the output files or retain the default location.
16. Click **Next**. The **Configure Ports** screen displays.
17. Change the values or retain the default values.
18. Click **Next**. The **Setup Type** screen displays.
19. Select the Setup Type: **Complete** or **Custom**.
    - For a Custom install, the **Custom Setup** screen displays.
20. Click **Next**. The **Ready to Install the Program** screen displays.
21. Click **Install**.
22. Click **Finish** on the **InstallShield Wizard Completed** screen.
23. Reconfigure the service "Log on as" settings.

:::note
The installation writes the log file named SMA_OpCon_SAP_LSAM_Install.log to the Windows directory. Consult this file if any installation problems are suspected.
:::

## Delete the old SAP LSAM directory

After the installation has completed and been successfully tested your new environment, you can delete the SAP LSAM directory from the previous installation.

1. Right-click on the **Start** button.
2. Select **Explore** from the menu.
3. Browse to the old SAP LSAM directory in the explorer window.
4. Select the **"0"** folder.
5. Use menu path: **File \> Delete**.
6. Click the **OK** button to **Confirm File Delete**.
7. **Close ☒** the **Explorer** window.

## Restart the service

1. Use the following menu path on the Application server: **Start \> Administrative Tools \> Server Manager**. The **Administrative Tools** window displays.
2. Expand (**+**) the **Configuration** option.
3. Click the **Services** icon. The **Services** window displays.
4. In the **Services** list, select **SMA OpCon Agent for SAP**.
5. Use menu path: **Action \> Start**.
6. Confirm the *Service's* **Status** is **Started**.

## Start communication with the LSAM

1. Double-click on **Machines Status** under the **Operation** topic. The **Machines Status** screen displays.
2. Right-click the machine and select **Start Communication** from the menu.
