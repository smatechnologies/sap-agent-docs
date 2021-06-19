---
sidebar_label: "Exit codes"
---

# SAP LSAM-specific exit codes

The following is a list of SAP LSAM exit conditions for failed jobs. If an exit condition is not in this list, the LSAM Exit Code position of the return status is a Windows error code. Refer to [Windows System Errors](https://help.smatechnologies.com/opcon/core/latest/Files/Concepts/Windows%20System%20Errors.htm) in the **Concepts** online help.

|Exit Code|Description|
|--- |--- |
|70001|The Job Name the LSAM is trying to send to the SAP system is null.|
|70002|The Job Number the LSAM is trying to send to the SAP system is null.|
|70003|The SAP R/3 and CRM Definition does not have an SAP Job Name defined.|
|70004|Error in logging on to SAP system: bad User ID, password, or TCP/IP address.|
|70005|Error in checking existing job status: could not find the job on the SAP system.|
|70006|Error in job copy: The LSAM could not copy the job to run it in SAP.|
|70007|Error in Job definition get: after the job was copied for execution, the LSAM couldn't retrieve the copied job's details; therefore, the job could not run.|
|70008|Error in starting the copied job: the job copy and job retrieve were successful, but the LSAM could not start the job.|
|70009|Error in getting the job's current status.|
|70010|Error in reading the job log.|
|70011|Error in getting the children job information for the current job.|
|70012|Error in aborting job.|
|70013|Error in reading the spoollist for the job.|
|70017|Error in starting the job immediately because no background processes were available.|
