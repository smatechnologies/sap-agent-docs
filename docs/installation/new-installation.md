# New installation

To install a new SAP LSAM on a Windows system, complete the procedures in this section.

## LSAM installation

### Install the SAP LSAM

1. Log in to the Windows machine as a Local Administrator.
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
13. Click **Skip**. The **Select Path for Output Files** screen displays.
14. Change the directory for the output files or retain the default location.
15. Click **Next**. The **Configure Ports** screen displays.
16. Change the values or retain the default values.
17. Click **Next**. The **Setup Type** screen displays.
18. Select the Setup Type: **Complete** or **Custom**.
    - For a Custom install, the **Custom Setup** screen displays.
19. Click **Next**. The **Ready to Install the Program** screen displays.
20. Click **Install**.
21. Click **Finish** on the **InstallShield Wizard Completed** screen.

:::note
The installation writes the log file named SMA_OpCon_SAP_LSAM_Install.log to the Windows directory. Consult this file if any installation problems are suspected.
:::

## Service startup setup

By default, the SAP LSAM service is set for an Automatic (Delayed Start) startup and for running under the local system account. If you want to change the default settings, perform the procedure in this section.

:::tip
SMA Technologies recommends leaving the SMA OpCon Agent for SAP service set to Automatic (Delayed Start) to avoid potential issues at startup time while other services and programs start up.
:::

### Set up service startup

1. Use the following menu path on the Application server: **Start \> Control Panel \> Administrative Tools**.
2. Click the **Administrative Tools** icon. The **Administrative Tools** window displays.
3. Double-click the **Services** icon. The **Services** window displays.
4. Double-click the newly installed **SMA OpCon Agent for SAP** service. The **SMA OpCon Agent for SAP Properties** dialog displays with the **General** tab in focus.
5. Select the **Service Startup type**:
   - **Automatic (Delayed Start)**
   - **Automatic**
   - **Manual**
   - **Disabled**
6. Click on the **Log On** tab.
7. Select one of the following two **Log on as** options for the service:
   - **Local System account**: If the service will run as the local system account, select this option to delete the default Domain User displayed in the text box.
   - **This account**: If the service will run as a user because it needs access to network directories, enter a *Domain User* in the text box, enter the *Password* for the Domain User, and re-enter the *Password* to confirm.
8. Click the **OK** button.

## Machine creation

When an SAP LSAM is installed, create a machine record with a unique Machine name and Socket number in OpCon. If the machine was previously defined in OpCon, you may skip this procedure.

### Create the machine in OpCon

1. Use menu path: **Start \> Programs \> OpConxps \> Enterprise Manager**. The **OpCon Login** screen displays.
2. Enter a *case-sensitive User Login ID* (e.g., ocadm) in the **Username** text box.
3. Enter the *case-sensitive password for the user* in the **Password** text box.
4. Select the **profile** in the **Profile** drop-down list.
5. Click the **Login** button to log in to the Enterprise Manager.
6. Double-click on **Machines** under the **Administration** topic in the **Navigation Panel**. The **Machines** screen displays.
7. Click the **Add** button on the **Machines** toolbar.
8. Enter the *official host name or alias based on the LSAM machine* in the **Name** text box.
9. Enter *any relevant documentation* for this LSAM machine in the **Documentation** text box.
10. Select **SAP** in the **Machine Type** drop-down list.
11. Set the *value* to a unique number (e.g., 13100) in the **Socket Number** box.
:::note
The socket number entered here must match the socket entered in the LSAM configuration file. For more information, refer to [TCP/IP parameters](../administration/configuration-file.md#tcpip-parameters).
:::
12. *(Optional)* Enter the *IPv4 or IPv6 address* in the **IP Address** field.
13. *(Optional)* Enter the *name* in the **Fully Qualified Domain Name** field.
14. Click the **Save** button on the **Machines** toolbar.
15. *(Optional)* Start communication with the machine by:
    1. Right-clicking over the graphic to enable the menu in the **Communication Status** frame.
    2. Selecting **Start Communication** from the menu.
16. Click on the **x** to the right of the **Machines** tab to close the **Machines** screen.
