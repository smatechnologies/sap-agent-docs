---
sidebar_label: 'Advanced features'
title: Advanced features overview
description: "Index of advanced SAP Agent features: JORS, logging, the kill command, MSGIN external events, and tracking and queuing external SAP jobs."
tags:
  - Conceptual
  - System Administrator
  - Agents
---

# Advanced features overview

## What is it?

The Advanced features section documents capabilities of the SAP Agent beyond core job execution. These features support output retrieval, troubleshooting, external integrations, and bringing SAP-initiated jobs under OpCon control.

## In this section

- [Job Output Retrieval System](./jors.md) — Configure JORS so SAP job output is viewable from the OpCon Enterprise Manager.
- [Logging](./logging.md) — Where the SAP Agent and JORS write log and trace files, and how archives are named, rotated, and retained.
- [Kill command](./kill-command.md) — Use the kill.exe utility shipped with the SAP Agent to forcibly end a Windows process by PID.
- [MSGIN](./msgin.md) — Send OpCon external events from any external program by dropping ASCII files into the SAP Agent's MSGIN directory.
- [Managing external jobs](./external-jobs.md) — Track or queue SAP jobs started outside OpCon, including the AdHoc schedule pattern.
