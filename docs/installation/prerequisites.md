---
sidebar_label: 'Prerequisites'
title: SAP Agent installation prerequisites
description: "SAP system release level, XBP interface, login account, and authorization role requirements that must be in place before installing the SAP Agent."
tags:
  - Reference
  - System Administrator
  - Installation
---

# SAP Agent installation prerequisites

## What is it?

Before installing the SAP Agent, your SAP system needs to be at the right release level, have the XBP interface initialized, and have an OpCon-only login account with the right authorization roles. This page walks through each requirement and shows you how to verify it.

## At a glance

| Requirement | What to check |
|---|---|
| SAP release | 4.6C or higher with support packages SAPKB46C49 and SAPKB46C52 applied |
| XBP version | XBP 2.0 must be initialized (INITXBP2). XBP 1.0 is not supported. |
| Login type | XMI login (not Dialog login) |
| Authorization | S_SAP_ALL or S_XMI_ALL on the OpCon SAP account |

After verifying the SAP Release 4.6C or higher has INITXBP2, make sure all SAP notes or patches have been applied to the 4.6C Release, especially support packages SAPKB46C49 and SAPKB46C52.

## Verify XBP 2.0 is installed on SAP

To verify XBP 2.0 is installed on SAP, complete the following steps:

1. Log on to **SAP**. The SAP Basis Administrator may need to verify this information.
2. Enter transaction **SE38**.
3. Enter program name **INITXBP2**.
4. Select the **Search** button to the left of the **Create** button. The returned display should show **INITXBP2**.

The user must supply OpCon with an XMI account for logging on to SAP and running background jobs. This account requires the SAP XMI security privilege "S_XMI_ALL". SAP recommends "S_XMI_ALL".

## Verify the user has the "S_XMI_ALL" security privilege

To verify the user has the "S_XMI_ALL" security privilege, complete the following steps:

1. Log on to **SAP**. The SAP Basis Administrator may need to verify this information.
2. Enter transaction **SU01**.
3. Select the account to be used by OpCon.
4. Select the **Profiles** tab and verify "S_XMI_ALL" is assigned to the user.

## OpCon SAP login account requirements

The SAP login for OpCon should not be a Dialog login. It must be an XMI (External Monitor Interface) login. The SAP login for OpCon profile should get one of two roles assigned to the login profile:

1. S_SAP_ALL
2. S_XMI_ALL

Normally, one of the above roles is sufficient and is the only requirement for the OpCon SAP Agent service to log on to SAP and process SAP background jobs.

Log on to the SAP system with the new OpCon login account. Run transaction SU53 on the SAP system to make sure the roles assigned to the profile have authorization to run the role assigned to the login account. If the login account has proper authorization, you should get this message from the SU53 transaction:

```console
"All Authorization checks have so far been successful"
```

After entering the SAP login account and password into the SAPLSAM.ini file, start the SAP Agent services on the SAM server. This service should connect to the SAP system. You can view the login connection results in the SAP Agent log.

:::note
Output files (for example, logs, reports, and job output files) reside in the Output Directory. For more information, refer to [File Locations](https://help.smatechnologies.com/opcon/core/file-locations) in the **Concepts** online help.
:::

## If the login fails

If the login failed or you cannot run SAP jobs with the SAP OpCon login, add the following roles to the SAP login profile and run transaction SU53 again to verify proper authorization.

### Roles for any SAP release

| Role | Description |
|---|---|
| S_XMI_XBP_A | Authorization for external management interfaces (XBP) |
| S_XMI_XOM_A | Authorization for external management interface (XOM) |
| S_XMI_XSP_A | Authorization for SMAPI XSP |
| S_BTCH_ADM | Background Processing: Background Administrator |
| S_BTCH_JOB | Background Processing: Operations on Background Jobs |
| S_BTCH_NAM | Background Processing: Background User Name |
| S_BTCH_ALL | General Authorizations for background processing (user) |

### Additional roles for ECC6

If your SAP system is an ECC6 release, add the following roles to your SAP account profile:

| Role | Description |
|---|---|
| S_A_SCON | ECC6 connector authorization |
| S_ABAP_ALL | General ABAP authorization |

After updating the profile, log on to the SAP system and run transaction SU53 again to verify proper authorization. If you still cannot connect or run SAP jobs from OpCon, contact SMA Technologies Customer Support.

## FAQs

**Why does the OpCon SAP login need to be an XMI login rather than a Dialog login?**
The SAP Agent connects through the XBP (eXternal Background Processing) interface, which is part of SAP's External Monitor Interface (XMI). A Dialog login does not have authorization for that interface and cannot start or monitor background jobs through XBP.

**Which SAP release does the SAP Agent require?**
SAP Release 4.6C or higher with INITXBP2 applied, including support packages SAPKB46C49 and SAPKB46C52.

**Which XBP version is supported?**
XBP 2.0 only. XBP 1.0 is not supported.

**Where can I confirm the login connected successfully?**
View the login connection results in the SAP Agent log. The default log location is documented in [Logging](../advanced-features/logging.md).

## Glossary

**INITXBP2** — The SAP program name that initializes the XBP 2.0 interface. The SAP Agent requires INITXBP2 to be present and the interface to be initialized before it can submit and monitor SAP background jobs.

**S_XMI_ALL** — The SAP authorization profile that grants full access to SAP's external management interfaces. Recommended by SAP for the account the SAP Agent uses to log on.

**XBP** — eXternal Background Processing. The SAP interface the SAP Agent uses to start, monitor, and intercept background jobs.

**XMI** — External Monitor Interface. The parent SAP interface that includes XBP and the related external management authorizations.

**SU53** — The SAP transaction used to display the most recent failed authorization check for the logged-on user. Useful for diagnosing missing roles on the OpCon SAP login.
