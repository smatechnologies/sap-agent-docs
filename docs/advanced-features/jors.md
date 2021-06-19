---
sidebar_label: 'JORS'
---

# Job Output Retrieval System

The Job Output Retrieval System (JORS) allows users to view job output from the OpCon/xps Enterprise Manager (EM). To activate JORS, configure both the LSAM and the EM.

## Configure the JORS Port in the EM

For the Enterprise Manager (EM) to connect to the LSAM for job output, configure the JORS Port Number to match the JORS Socket configured through the LSAM.

1. Use menu path: **Start \> Programs \> OpConxps \> Enterprise Manager**.
2. In the **Username** text box, enter a *case-sensitive User Login ID* (e.g., ocadm) on the OpCon Login Screen.
3. In the **Password** text box, enter the **case-sensitive password** for the user.
4. In the **Profile** drop-down list, select the *Profile*.
5. Click the **Login** button to log in to the Enterprise Manager.
6. Double-click on **Machines** in the Navigation panel under Administration.
7. In the **Select Machine** list, select the SAP Machine.
8. Right-click over the graphic to enable the menu in the Communication Status frame.
9. Select **Stop Communication** from the menu.
10. Click on **Open Advanced Settings Panel** in the Advanced Settings.
11. Click on the **Communication Settings** tab.
12. Click the **JORS Port Number** parameter.
13. In the frame below the advanced machine properties, enter the *same value entered for the JORS Socket* in the LSAM Configuration in the **Modify Parameter** frame at the bottom of the screen. For information on the *JORS Socket* in the LSAM configuration file, refer to [JORS Settings](../administration/configuration-file.md#jors-settings).
14. Click the **Update** button.
15. Click the **Save** button to save and close the Advanced Settings Panel.
16. Right-click over the graphic to enable the menu in the Communication Status frame.
17. Select **Start Communication** from the menu.
18. Click on the **x** to the right of the **Machines** tab to close the *Machines* screen.

## View Job Output in the EM

1. Under the **Operation** topic, double click on **List** below the Navigation tab on the Enterprise Manager Screen.
2. Click the **plus sign (+)** to expand the specific *date*.
3. Click the **plus sign (+)** to expand the specific *schedule*.
4. Right-click on the desired **job**.
5. Click on **View Job Output** from the menu.
6. Wait for JORS to retrieve the list of output files for the job in the Job Output Retriever window.
7. Double-click on the **Output File(s)** name to retrieve the *output file information*.
8. *(Optional)* Click the **Copy To Clipboard** button in the Log Viewer window.
9. *(Optional)* Click the **Open external editor** button to open the file in an external editor (e.g., Notepad).
10. Click the **Close** button to close the *Log Viewer* window.
11. Click the **Close** button to close the *Job Output Retriever* window.
