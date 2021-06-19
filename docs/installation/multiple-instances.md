---
sidebar_label: "Multiple instances"
---

# Additional SAP LSAM instances

## New Installation

If additional LSAMs are needed after installing the initial SAP LSAM, repeat the [Install the SAP LSAM](../installation/new-installation.md#install-the-sap-lsam). The installation package will automatically transform to install new instances of the LSAM. After installing each new instance, define a new machine in OpCon with a unique name and port number using the procedure for [Machine Creation](../installation/new-installation.md#machine).

## Manually install additional LSAMs to unique directories

If you have previously installed additional LSAMs to unique directories, you can continue using this method if you desire. This causes more overhead for maintenance than the automatic method as described above; however, SMA Technologies will support this method of manual installation.

### Create a new directory

1. Right-click on the **Start** button on the application server.
2. Select **Explore** from the menu.
3. Browse to the OpConxps <Target Directory\> in the explorer window.
4. Use menu path: **File \> New \> Folder**.
5. Name the new *SAP LSAM <custom directory\>* (e.g., SAPLSAM13200).
6. Browse to the OpConxps <Configuration Directory\>
7. Use menu path: **File \> New \> Folder**.
8. Name the new SAP LSAM directory the same as the new program file directory (e.g., SAPLSAM13200).

### Copy required files

1. Browse to the first LSAM's <Target Directory\> in the explorer window.
2. Use menu path: **Edit \> Select All**.
3. Use menu path: **Edit \> Copy**.
4. Browse to the new LSAM's <Target Directory\>.
5. Use menu path: **Edit \> Paste**.
6. Browse to the first LSAM's <Configuration Directory\>.
7. Use menu path: **Edit \> Select All**. Use menu path: **Edit \> Copy**.
8. Browse to the new LSAM's <Configuration Directory\>.
9. Use menu path: **Edit \> Paste**.

### Modify the new LSAM's configuration file

1. Browse to <Configuration Directory\>\\<custom directory\>\\ in the explorer window.
2. Find the **SAPLSAM.ini** file.
3. Right-click the file, and select **Open With**.
4. Select an ASCII text editor (e.g., Notepad) from the menu.
5. In the text editor, make any necessary modifications to the configuration options. For more information about editing the SAPLSAM.ini file, refer to [SAP LSAM Configuration File](../administration/configuration-file.md).
6. Define a unique **ShortServiceName** in the General Settings section.
7. Define a unique **DisplayServiceName**.
8. Define a unique **SocketNumberToSAM** in the TCP/IP Parameters section.
9. Define a unique **JORSSocket** in the JORS Settings section.
10. Configure the connection information for the SAP system. For more information, refer to [SAP System Settings](../administration/configuration-file.md#sap-system-settings).
11. Use menu path: **File \> Save**.
12. **Close ☒** the **Explorer** window.

### Register the new LSAM as a service and start

1. Click **Start**.
2. Enter **cmd** in the search box to open a command window.
3. Change the directory to the new LSAM's directory in the Command window.
4. Enter the following command: **regsvc.cmd -install**.
5. **Close ☒** the command window.
6. Use menu path: **Start \> Administrative Tools \> Server Manager**.
7. Expand (+) the **Configuration** option in the Administrative Tools window.
8. Click the **Services** icon.
9. In the **Services** list, select the New Display Service Name for the LSAM.
10. Use menu path: **Action \> Start**.
11. Confirm the *Service's* **Status** is **Started**.

### Create the machine in OpCon

When an SAP LSAM is installed, create a machine record with a unique Machine name and Socket number in OpCon. If the machine was previously defined in OpCon, you may skip this procedure.

1. Use menu path: **Start \> Programs \> OpConxps \> [Enterprise     Manager]{.GeneralDesktopUI}**. The **OpCon Login** screen displays.
2. In the **Username** text box, enter a *case-sensitive User Login ID* (e.g., ocadm).
3. In the **Password** text box, enter the *case-sensitive password* for the user.
4. In the **Profile** drop-down list, select the *Profile*.
5. Click the **Login** button to log in to the Enterprise Manager.
6. Double-click on **Machines** in the **Navigation** panel under **Administration**.
7. Click the **Add** button on the Machines toolbar in the **Machines** screen.
8. In the **Name** text box, enter the Official Host Name or Alias based on the LSAM machine.
9. In the **Documentation** text box, enter any relevant documentation for this LSAM machine.
10. In the **Machine Type** drop-down list, select **SAP**.
11. In the **Socket Number** box, set the value to a *unique number* (e.g., 13200).
12. *(Optional)* In the **IP Address** field, enter the *IPv4* or *IPv6 address*.
13. *(Optional)* In the **Fully Qualified Domain Name** field, enter the *name*.
14. Click the **Save** button on the **Machines** toolbar.
15. Click **Open Advanced Settings Panel** under the **Advanced Settings**. The **Advanced Machine Properties** window displays.
16. Click the **SAP Settings** tab.
17. Configure the **Client ID** as the SAP Client ID for the SAPQueryProcessor to connect to the SAP system.
18. Click **Update**.
19. Configure the **Gateway** with the full connection string for the SAPQueryProcessor to connect to the SAP system.
20. Click **Update**.
21. Configure the **System Number** as the system number for the SAPQueryProcessor to connect to the SAP system.
22. Click **Update**.
23. *(Optional)* Configure the **RFC Trace** to On if the SAP RFC trace for the SAPQueryProcessor message requests should be turned on.
24. Click **Update**.
25. Click **Save**.
26. *(Optional)* To start communication with the machine, right-click over the graphic to enable the menu in the **Communication Status** frame.
27. Click on the **x** to the right of the **Machines** tab to close the Machines screen.

## Upgrade installation

If you installed multiple instances of the SAP LSAM from a distribution prior to 15.0, complete the [Upgrade Installation](upgrade-installation.md) instructions for each instance of the LSAM. The installation package will automatically transform to install new instances of the LSAM.

## Manually upgrade an additional LSAM

A manual upgrade is a requirement for each additional LSAM that was manually installed to a unique directory. After upgrading the first SAP LSAM from the DVD installation, complete the steps in this section for each additional LSAM.

### Check for running jobs

1. Double-click on **Machines Status** under the **Operation** topic. The **Machines Status** screen displays.
2. Confirm the number of running jobs is **0** for the SAP machine.
3. If running jobs exists, contact the OpCon administrator if you should:
    a.  Wait for the processes to end **- or -**
    b.  **Kill** the processes on the SAP side. For more information, refer to [Kill Command](../advanced-features/kill-command.md).
4. Repeat steps 3 a) or b) until the **Machines Status** screen indicates **Running Jobs** of **0/<max\>**.
5. Right-click the machine and select **Stop Communication** from the menu.

### Stop the service

1. Use the following menu path on the Application server: **Start \> Administrative Tools \> Server Manager**. The **Administrative Tools** window displays.
2. Expand (**+**) the **Configuration** option.
3. Click the **Services** icon. The **Services** window displays.
4. In the **Services** list, select the Additional Display Service Name for the LSAM.
5. Use menu path: **Action \> Stop**.
6. Confirm the *Service's* **Status** is **Stopped**.

### Stop the JORS service

1. In the **Services** list, select the JORS Service.
2. Use menu path: **Action \> Stop**.
3. Confirm the *Service\'s* **Status** is **Stopped**.
4. Close the **Services** window.
5. Repeat this procedure for each instance of the LSAM on the machine.

### Copy upgrade files

1. Browse to the first SAP LSAM's directory in the explorer window.
2. Use menu path: **Edit \> Select All**. Use menu path: **Edit \> Copy**.
3. Browse to the additional SAP LSAM directory. 4.  Use menu path: **Edit \> Paste**.

### Confirm the additional LSAM's configuration settings

1. Browse to <Configuration Directory\>\\**SAP LSAM**\\ in the explorer window.
2. Find the **SAPLSAM.ini** file.
3. Right-click the file, and select **Open With**.
4. Select an ASCII text editor (e.g., Notepad) from the menu.
5. Find the **NewSAPStopLSAM.ini** file in the first SAP LSAM's <Configuration Directory\> in the additional LSAM directory.
6. Right-click the file, and select **Open With**.
7. Select an ASCII text editor (e.g., Notepad) from the menu.
8. In the text editor, compare the NewSAPLSAM.ini file with the SAPLSAM.ini file so you can copy any new settings into from the new version of the LSAM to your existing SAPLSAM.ini file. Make any necessary modifications to the configuration options. For more information about editing the SAPLSAM.ini file, refer to [SAP LSAM Configuration File](../administration/configuration-file.md).

### Restart the service

1. Use the following menu path on the Application server: **Start \> Administrative Tools \> Server Manager**. The **Administrative Tools** window displays.
2. Expand (**+**) the **Configuration** option.
3. Click the **Services** icon. The **Services** window displays.
4. In the **Services** list, select the New Display Service Name for the LSAM.
5. Use menu path: **Action \> Start**.
6. Confirm the *Service's* **Status** is **Started**.

### Start communication with the LSAM

1. Double-click on **Machines Status** under the **Operation** topic. The **Machines Status** screen displays.
2. Right-click the machine and select **Start Communication** from the menu.
