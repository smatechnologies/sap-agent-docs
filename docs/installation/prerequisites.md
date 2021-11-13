---
sidebar_label: 'Prerequisites'
---

# SAP LSAM installation prerequisites

After verifying the SAP Release 4.6C or higher has INITXBP2, it is necessary to make sure all SAP notes or patches have been applied to the 4.6C Release especially support package SAPKB46C49 and SAPKB46C52.

- SAP Release level has to be 4.6C or higher.
- The LSAM is certified for XBP 2.0 and will not work with 1.0. In order to verify XBP 2.0 is installed on SAP:
  1. Log into **SAP** (will require the SAP Basis Administrator to verify this information).
  2. Enter Transaction **SE38**.
  3. Enter program name **INITXBP2**.
  4. Click the **Search** button to the left of the *Create* button.
    a.  The returned display should show **INITXBP2**.
    b.  The user must supply OpCon with an XMI account for logging into SAP and running background jobs. This account requires SAP XMI security privilege of "S_XMI_ALL". SAP recommends "S_XMI_ALL".
    c.  In order to verify if the user has the security privilege "S_XMI_ALL":
        i.  Log into **SAP** (will require the SAP Basis Administrator to verify this information).
        ii. Enter transaction **SU01**.
        iii. Select the account to be used by OpCon.
        iv. Select the **Profiles** tab and verify "S_XMI_ALL" is assigned to the user.

Regarding the OpCon SAP Login Account Requirements, the SAP login for OpCon should not be a Dialog login. It must be a XMI (External Monitor Interface) login. The SAP login for OpCon profile should get one of two roles assigned to the login profile:

1. S_SAP_ALL
2. S_XMI_ALL

Normally, one of the above roles is sufficient and is the only requirement for OpCon SAP LSAM service to log into SAP and process SAP background jobs.

Log on to the SAP system with the new OpCon Login account. Execute transaction SU53 on the SAP system to make sure the above roles assigned to the profile have authorization to execute the Role assigned to the login account. If the login account has proper authorization, you should get this message from the SU53 transaction:

```console
"All Authorization checks have so far been successful"
```

After entering the SAP login account and password into the SAPLSAM.ini file, start the SAP LSAM services on the SAM server. This service should connect to the SAP system. You can view the login connection results in the SAP LSAM log.

:::note
Output files (e.g., logs, reports, and job output files) reside in the Output Directory. For more information, refer to [File Locations](https://help.smatechnologies.com/opcon/core/file-locations) in the **Concepts** online help.
:::

If the login failed or you cannot run SAP jobs with the SAP OpCon login, please revisit the SAP login profile and add the following roles and execute transaction SU53 again on the SAP system to verify proper authorization:

- S_XMI_XBP_A - Authorization for external management interfaces (XBP)
- S_XMI_XOM_A - Authorization for external management interface (XOM)
- S_XMI_XSP_A - Authorization for SMAPI XSP
- S_BTCH_ADM - Background Processing: Background Administrator
- S_BTCH_JOB - Background Processing: Operations on Background Jobs
- S_BTCH_NAM - Background Processing: Background User Name
- S_BTCH_ALL - General Authorizations for background processing (user)

If your SAP system is an ECC6 release, add the following roles to your SAP account profile.

- S_A_SCON
- S_ABAP_ALL

Log on to the SAP system and execute transaction SU53 again on the SAP system to verify proper authorization. If you still cannot connect or run SAP jobs from OpCon, please contact SMA Technologies Customer Support.
