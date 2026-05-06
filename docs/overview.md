---
sidebar_label: 'SAP Agent'
title: SAP Agent
description: "Overview of the SAP Agent, an OpCon agent that schedules SAP jobs within an SAP environment."
tags:
  - Conceptual
  - System Administrator
  - Agents
---

# SAP Agent

## What is it?

The SAP Agent is an OpCon agent that schedules and monitors SAP background jobs from a single OpCon schedule. It runs on a Windows host, connects to your SAP system through the SAP XBP interface, and lets operators control SAP work the same way they control any other automated workload.

Use the SAP Agent to:

- Schedule and monitor SAP background jobs alongside other enterprise workload.
- Track or queue SAP jobs that were created outside OpCon, so they appear in Operations.
- Retrieve job logs and spool output from SAP for review in the Enterprise Manager.
- Send commands to SAP — such as kill and restart — from OpCon job actions.

## Why teams use it

- **One pane of glass.** SAP jobs show up in OpCon next to file transfers, database tasks, and other workloads, so operators don't switch tools to triage.
- **Cross-system dependencies.** OpCon can hold a SAP job until upstream non-SAP work finishes, then release it automatically.
- **Faster troubleshooting.** Job status, agent exit codes, SAP machine messages, and output (logs and spools) all surface in OpCon.

## How it fits together

```
OpCon (SMANetCom) ──► SAP Agent (Windows host) ──► SAP system (XBP / BAPI)
                                  │
                                  └─► JORS service ──► Enterprise Manager (View Job Output)
```

- The **SAP Agent** is a Windows service that talks to OpCon over a configured socket and to SAP over the XBP interface.
- The **JORS service** is installed alongside the agent and delivers SAP job logs and spool files back to the Enterprise Manager when an operator opens View Job Output.
- All settings live in the **SAPLSAM.ini** configuration file. See [Configuration file](./administration/configuration-file.md) for the full reference.

## Where to start

| If you are... | Start with |
|---|---|
| Installing the agent for the first time | [Prerequisites](./installation/prerequisites.md) |
| Upgrading an existing install | [Upgrade installation](./installation/upgrade-installation.md) |
| Running multiple agents on one host | [Multiple instances](./installation/multiple-instances.md) |
| Configuring an installed agent | [Configuration file](./administration/configuration-file.md) |
| Triaging a failed SAP job | [Exit codes](./reference/exit-codes.md) and [Machine messages](./reference/machine-messages.md) |
| Setting up output retrieval | [Job Output Retrieval System](./advanced-features/jors.md) |
