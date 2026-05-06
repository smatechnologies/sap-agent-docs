---
sidebar_label: 'Kill command'
title: Kill command
description: "Use the SMA kill.exe utility shipped with the SAP Agent to forcibly end a Windows process by process ID."
tags:
  - Reference
  - System Administrator
  - Agents
---

# Kill command

## What is it?

`kill.exe` is a small Windows utility shipped with the SAP Agent that forcibly ends a Windows process by its process ID (PID). It is SMA's Windows version of the UNIX `kill` command and is intended as a last-resort administrative tool when a process will not respond to normal stop commands.

:::warning
This utility ends a **Windows process**, not a SAP-side job. To end a job running on the SAP system, use SAP's own facilities or the SAP Agent's job kill action.
:::

## Where it lives

```
<Target Directory>\OpConxps\SAP LSAM\kill.exe
```

:::tip
To make `kill.exe` easier to call from any directory, copy it into the Windows or WINNT directory.
:::

## Syntax

```console
kill <pid>
```

| Argument | Description |
|---|---|
| `<pid>` | The process ID of the process to end. Find the PID in Windows Task Manager. |

## FAQs

**When should I use kill.exe instead of stopping a job in OpCon or SAP?**
Use it as a last-resort administrative tool when a Windows process associated with the agent or a related component will not respond to normal stop commands. Whenever possible, end SAP jobs through SAP itself or through OpCon's job actions.

**Where do I get the process ID?**
From the Windows Task Manager (or any tool that lists Windows processes by PID).

**Is the kill command the same as ending a SAP job?**
No. kill.exe ends a Windows process. To end a job running on the SAP side, use SAP's own facilities or the SAP Agent's job kill action.
