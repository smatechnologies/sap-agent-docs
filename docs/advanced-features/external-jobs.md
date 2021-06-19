---
sidebar_label: "Managing external jobs"
---

# Tracking and Queuing External Jobs

SAP LSAM supports the ability for a job started outside OpCon to be tracked or queued by OpCon.

- For Tracked and Queued jobs, the SAP LSAM will capture each defined job and put it in an "Intercepted" status when it is submitted by a user to the SAP system.
  - For Tracked jobs, the SAP LSAM then releases the intercepted job immediately and at the same time sends a "$JOB:TRACK" event to SAM for tracking.
  - For Queued jobs, the SAP LSAM leaves the job in an Intercepted status and sends a "$JOB:QUEUE" event to SAM for qualification.
    - The SAM then qualifies the job based on time and other dependencies in OpCon.
    - When qualified, the SAM will submit the job back to the LSAM.
    - The LSAM will then release the job from the "Intercepted" status to execute on the SAP system.
- After SAM has accepted the Track or Queue request, the job can be viewed in Operations in the Enterprise Manager.

To prepare OpCon to track external jobs, configure Job Track/Queue section in the SAPLSAM.ini file and define external job(s) in Job Master.

## Configure the Job Track/Queue section in the SAPLSAM.ini file

1. Right-click on the **Start** button.
2. Select **Explore** from the menu.
3. Browse to <Configuration Directory\>\\SAP LSAM\\.
4. Find the **SAPLSAM.ini** file.
5. Right-click the file and select **Open With**.
6. Select an *ASCII text editor* (e.g., Notepad) from the **Choose the program you want use** list box.
7. Find the section titled **\[Job Track/Queue Settings\]**.
8. Confirm the value for **JobTrackCheckInterval** is the desired value.
9. To define an SAP job to Track:
   - *(Optional)* For **TrackFrequencyName1**, enter the name of the frequency to be used for the tracked job. The frequency name is the name entered in the Job Master (Frequency tab) screen for the job to be tracked.
     - If the frequency is not provided, the SAM-SS uses the first defined frequency for the job.
     - If the frequency is not found for the job, the tracking request is denied.
   - *(Optional)* For **TrackOpConSkdName1**, enter the name of the schedule on which the job to be tracked is defined.
     - If not defined, the SAM-SS assumes the job is located on the AdHoc schedule. For more information, refer to [The AdHoc Schedule](#The).
     - If the job is not found on the schedule, the tracking request is denied.
     - If a schedule other than the AdHoc schedule is specified, the schedule must already be built in the Daily tables. If the schedule does not exist in the daily tables, the tracking request is denied.
     - If the AdHoc schedule is used and does not already exist on the current date, it is automatically added to the Daily tables on the current date.
     - If an alternate schedule is specified, and the schedule does not already exist for the current date, the tracking request is denied.
   - For **TrackOpConJobName1**, enter the name of the job as known to OpCon. This is the name entered on the Job Master screen in the Enterprise Manager.
     - If the job does not exist in Job Master, the tracking request is denied.
     - If a duplicate job already exists in the Daily tables (and the job name is eight characters or less in length), a $nnn suffix is added to the job name (e.g., TestJob is displayed as TestJob\$001, TestJob\$002, TestJob\$003, and so forth).
     - If a duplicate job already exists in the Daily tables and the job name is longer than eight characters, the tracking request is denied.
   - For **TrackClientID1**, enter the client id under which the tracked job starts on the R/3 or CRM system.
   - For **TrackJobName1**, enter the job name defined in the R/3 or CRM system for the tracked job.
   - For **TrackJobCreator1**, enter the job creator defined for the tracked job in the R/3 or CRM system.
10. To define another job to Track, copy the values for steps 9)a) through 9)f and paste them below the values replacing the last character with a new identifier (e.g., TrackFrequencyName2).
11. To define an SAP job to Queue, define a new group of settings for the following:
    - *(Optional)* For **QueueFrequencyName1**, enter the name of the frequency to be used for the queued job. The frequency name is the name entered in the Job Master (Frequency tab) screen for the job to be queued.
      - If the frequency is not provided, the SAM-SS uses the first defined frequency for the job.
      - If the frequency is not found for the job, the queuing request is denied.
    - *(Optional)* For **QueueOpConSkdName1**, enter the name of the schedule on which the job to be queued is defined.
      - If not defined, the SAM-SS assumes the job is located on the AdHoc schedule. For more information, refer to [The AdHoc Schedule](#The).
      - If the job is not found on the schedule, the queuing request is denied.
      - If a schedule other than the AdHoc schedule is specified, the schedule must already be built in the Daily tables. If the schedule does not exist in the daily tables, the queuing request is denied.
      - If the AdHoc schedule is used and does not already exist on the current date, it is automatically added to the Daily tables on the current date.
      - If an alternate schedule is specified and the schedule does not already exist for the current date, the queuing request is denied.
    - For **QueueOpConJobName1**, enter the name of the job as known to OpCon. This is the name entered on the Job Master screen in the Enterprise Manager.
      - If the job does not exist in Job Master, the queuing request is denied.
      - If a duplicate job already exists in the Daily tables (and the job name is eight characters or less in length), a $nnn suffix is added to the job name (e.g., TestJob is displayed as TestJob$001, TestJob$002, TestJob$003, and so forth).
      - If a duplicate job already exists in the Daily tables and the job name is longer than eight characters, the queuing request is denied.
    - For **QueueClientID1**, enter the client id under which the queued job starts on the R/3 or CRM system.
    - For **QueueJobName1**, enter the job name defined in the R/3 or CRM system for the queued job.
    - For **QueueJobCreator1**, enter the job creator defined for the queued job in the SAP system.
12. Use menu path: **File \> Save**.
13. **Close ☒** the text editor.

### Define External Jobs in Job Master

All jobs to be tracked or queued must be defined in Job Master with the 1following information:

1. Under the **Administration** topic, double-click on **Job Master** below the Navigation tab on the Enterprise Manager screen. The **Job Master** screen displays.
2. In the **Schedule** drop-down list, select the *desired Schedule* (e.g., AdHoc).
3. On the toolbar, click **+** to **Add** a new job to the schedule.
4. In the **Name** field, enter a name for the job.
5. In the **Job Type** field, select **SAP R/3 and CRM**.
6. In the **Primary Machine** drop-down list, select the *desired Machine* to run the job on.
7. On the toolbar, click the **Save** button to save the job definition.
8. Click the **Frequency** tab.
9. Create a frequency for the job with settings that cause the job to never be automatically built into a daily schedule. SMA Technologies suggests the following selections on the Frequency definition Wizard screen:
   - When to Schedule: **On Request**.
   - Request Date: *Any date in the past*.
   - Every Year: **No**.
   - Set A/O/B/N flag as desired.

## The AdHoc Schedule

SMA Technologies recommends adding jobs to be tracked to the AdHoc schedule for two reasons:

1. The schedule is dynamically added to the Daily tables when the SAM-SS is informed of a job on the schedule that is to be tracked.
2. Once active, the schedule remains open until midnight when it is allowed to go to a completed state. All jobs on the schedule must finish before the schedule closes. If jobs to be tracked are on user-defined schedules, those schedules must be built and must be active in the Daily tables for the SAM-SS to track the job(s). The corresponding schedule name must also be specified correctly in the SAPLSAM.ini. On the other hand, if jobs to be tracked are defined on the AdHoc schedule, there is no need to define the TrackOpconSkdName value or to worry about the status of a schedule.
