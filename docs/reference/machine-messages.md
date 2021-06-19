# Machine messages

To the right of the OpCon Job Status in the Operation Daily List screen, the SAP LSAM populates a 20-character message to communicate numeric job completion information. This information is located in the *Detailed Job Messages parameter* in *Enterprise Manager\>Operation\>Job Information screen\>Configuration Tab\>Operations Related Information Tab*. For additional information, refer to [Job Information](https://help.smatechnologies.com/opcon/core/latest/Files/UI/Enterprise-Manager/Job%20Information.htm) in the **Enterprise Manager** online help.

- For jobs that are running, the LSAM returns the SAP job number.
- If the running job has child jobs, the LSAM returns the current status of the child job(s) in following format: <Child Name\> - <Current Status\>
  - The Child Name displays up to 15 characters of the child job name.
  - The current status contains one of the following:
    - Actv: Active
    - Rdy: Ready
    - Int: Intercepted
    - Schd: Scheduled
    - Fin: Finished
    - Term: Terminated
    - Rel: Released

The complete child name and its current status are available in the Job Configuration screen.

- For jobs that Finish OK, the LSAM returns information in the following format: 0-< SAP job ID\>
- For jobs that Failed, the LSAM returns information in the following format: <LSAM Exit Code\> - <SAM or SAP job number\>
  - If the LSAM was unable to create a copy of the SAP R/3 and CRM job before it failed, the message contains the SAM job number.
  - If the LSAM was able to create a copy of the SAP R/3 and CRM job before it failed, the message contains the SAP Job number.
