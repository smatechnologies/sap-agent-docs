---
sidebar_label: 'MSGIN'
title: MSGIN external events directory
description: "Send OpCon external events from any external program by dropping ASCII files into the SAP Agent's MSGIN directory."
tags:
  - Procedural
  - Automation Engineer
  - Events
---

# MSGIN

## What is it?

MSGIN is a directory the SAP Agent monitors for external events. Any program can drop an ASCII file with a valid OpCon event into the directory, and the agent forwards the event to OpCon. This gives external systems a simple, file-based way to trigger OpCon work without using a programmatic API.

## How it works

```
External program ──► Drops ASCII file ──► MSGIN directory ──► SAP Agent reads + deletes file ──► SAM processes event
```

The MSGIN directory is `<Configuration Directory>\SAP LSAM\MSGIN\` on the machine where the SAP Agent is installed.

:::note
The Configuration Directory is based on where you installed your programs. For more information, refer to [File Locations](https://help.smatechnologies.com/opcon/core/file-locations) in the **Concepts** online help.
:::

Each ASCII file must contain:

- A valid OpCon event
- A User Login ID
- An external event password

The agent reads the file, passes the text to the SAM, and deletes the file. If the SAM receives an invalid event, it writes "Invalid Event" to the SAM Critical.log file.

## Placing a message into the MSGIN directory

To place a message into the MSGIN directory, complete the following steps:

1. Open an *ASCII text editor* (for example, Notepad) on the Windows machine.
2. Enter the following text:

   ```console
   $JOB:RELEASE,[[$DATE]],ProdSched,ProdJob,BatchUser,EventPassword
   ```

   - Place an OpCon User Login ID and an external event password on the end of the event. This password is not the same as the database password used to log on to the Enterprise Manager. Refer to [External Events](https://help.smatechnologies.com/opcon/core/events/defining#external-events) in the **OpCon Events** online help.
   - The user must have the correct function privileges in OpCon for the SAM to perform the command contained in the external event.
   - The only allowable tokens in an external event are `$DATE`, `$TIME`, and `$NOW`. These tokens pull values from the current system date and time.
   - If multiple events are desired, enter a carriage return and enter another event on the next line.
3. Save the file in the `<Configuration Directory>\`**SAP LSAM\\MSGIN\\** directory.
4. The SAP Agent reads the file, sends the contents to the SAM, and finally deletes the file.

The SAM checks the user on the event, and then processes the command contained in the external event. If there are syntactical errors, the SAM discards the event and writes the message "Invalid Event" into the SAM Critical.log file.

## FAQs

**Why was my MSGIN file deleted but nothing happened in OpCon?**
The agent forwards the file's contents to the SAM, which validates the event. If the event is syntactically invalid, the SAM discards it and writes "Invalid Event" to the SAM Critical.log file. Check that file first.

**Which credentials does MSGIN use?**
The User Login ID and the external event password placed at the end of the event. The external event password is configured separately from the user's Enterprise Manager database password.

**Which tokens can I use inside an event?**
Only `$DATE`, `$TIME`, and `$NOW`, which substitute current system date and time values.

**How do I send multiple events in one file?**
Add a carriage return after each event line and place the next event on the following line.

## Glossary

**MSGIN** — The directory the SAP Agent monitors for ASCII files containing OpCon external events.

**External event** — A command that triggers OpCon to take an action (for example, releasing a job) when the agent forwards the event text to the SAM.

**SAM** — The Schedule Activity Monitor. The OpCon component that receives events from the agent and acts on them.
