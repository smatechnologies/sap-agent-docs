# MSGIN

MSGIN is the name of the directory the SAP LSAM monitors for external events. The location of the MSGIN directory is <Configuration Directory\>\\SAP LSAM\\MSGIN\\ on the machine where the SAP LSAM is installed.

:::note
The Configuration Directory is based on where you installed your programs. For more information, refer to [File Locations](https://help.smatechnologies.com/opcon/core/file-locations) in the **Concepts** online help.
:::

Any external program or application can generate and place an ASCII file in this directory. These ASCII files must contain a valid OpCon event(s), User Login ID, and event password for the SAM to process the event(s).

The SAP LSAM watches the MSGIN directory for any text file. The SAP LSAM reads the file, passes the text to the SAM for processing, and finally the LSAM deletes the file. If the SAM receives an invalid event, the SAM documents the error in the SAM Critical.log file.

## Placing a message into the MSGIN directory

1. Open an *ASCII text editor* (e.g., Notepad) on the Windows machine.
2. Enter the following text:

   ```console
   $JOB:RELEASE,[[$DATE]],ProdSched,ProdJob,BatchUser,EventPassword 
   ```

   - Place an OpCon User Login ID and an external event password on the end of the event. This password is not the same as the database password used to log in to the Enterprise Manager. Refer to [External Events](https://help.smatechnologies.com/opcon/core/events/defining#external-events) in the **OpCon Events** online help.
   - The user must have the correct function privileges in OpCon for the SAM to perform the command contained in the external event.
   - The only allowable tokens in an external event are $DATE, $TIME, and $NOW. These tokens pull values from the current system date and time.
   - If multiple events are desired, enter a carriage return and enter another event on the next line.
3. Save the file in the <Configuration Directory\>**\\SAP LSAM\\MSGIN\\** directory.
4. The SAP LSAM reads the file, sends the contents to the SAM, and finally deletes the file.

The SAM checks the user on the event, and then processes the command contained in the external event. If there are syntactical errors, the SAM discards the event and writes the message "Invalid Event" into the SAM Critical.log file.
