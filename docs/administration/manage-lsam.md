# Managing the LSAM

To control the SAP LSAM status, use the Windows Service Control Manager. The procedures below explain the process of starting and stopping the SAP LSAM.

## Start the LSAM services

1. Use menu path: **Start \> Control Panel**.
2. Double-click the **Administrative Tools** icon.
3. Double-click the **Services** icon to run the Service Control Manager.
4. Double-click **SMA OpCon Agent for SAP** in the **Services** list.
5. Confirm the *LSAM's* **Startup Type** is set to **Automatic (Delayed Start)**. If it is not, change the Startup type with the following steps:
    a.  Select **Automatic (Delayed Start)** from the **Startup Type** drop-down list box.
    b.  Click **OK**.
6. Use menu path: **Action \> Start**.
7. Confirm the *LSAM's* **Status** is **Started**.
8. Double-click **SMA OpCon JORS for SAP** in the **Services** list.
9. Confirm that the *JORS' service* **Startup Type** is set to **Automatic (Delayed Start)**. If it is not, change the Startup type with the following steps:
    a.  Select **Automatic (Delayed Start)** from the **Startup Type** drop-down list box.
    b.  Click **OK**.
10. Use menu path: **Action \> Start**.
11. Confirm the *JORS'* **Status** is **Started**.
12. **Close ☒** the **Services** window.

## Stop the LSAM services

1. Use menu path: **Start \> Control Panel**.
2. Double-click the **Administrative Tools** icon.
3. Double-click the **Services** icon to run the Service Control Manager.
4. Click **SMA OpCon Agent for SAP** in the **Services** list.
5. Use menu path: **Action \> Stop**.
6. Confirm the *LSAM's* **Status** is **Stopped**.
7. Click **SMA OpCon JORS for SAP** in the **Services** list.
8. Use menu path: **Action \> Stop**.
9. Confirm the *JORS* **Status** is **Stopped**.
10. **Close ☒** the **Services** window.
