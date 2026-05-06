---
sidebar_label: 'Installation media'
title: Determine installation media
description: "Choose the delivery method (USB, FTP, DVD-ROM, or ISO) you will use to run the SAP Agent installer."
tags:
  - Reference
  - System Administrator
  - Installation
---

# Determine installation media

## What is it?

Installation media is the delivery format you use to obtain and run the SAP Agent installer on the target machine. The SAP Agent supports four delivery methods so you can match the install to how the OpCon installation files were provided to you.

## Supported delivery methods

In the documentation for running the setup program, replace `<media>` with the desired method of delivery:

- **USB**: If using a USB drive, plug the USB drive into a machine and copy the installation files to a folder on the hard drive of the machine where the software will be installed. Run the installation from the hard drive.
- **FTP**: If downloading the files over FTP, the best practice is to download the installation files directly to a folder on the hard drive of the machine where the software will be installed. Run the installation from the hard drive.
- **DVD-ROM**: Insert the DVD into the drive and run the installation from the DVD. The files may also be copied to the hard drive.
- **ISO**: Mount the ISO image as a virtual DVD and run the installation from that location.

## FAQs

**Why does SMA Technologies recommend running the installation from the hard drive?**
Copying the installation files to a local folder before running setup avoids partial reads or interruptions if a removable drive is unplugged or a network connection drops mid-install.

**What does `<media>` refer to in the rest of the SAP Agent documentation?**
`<media>` is a placeholder used in command examples and procedures. Replace it with the delivery method you chose (USB, FTP, DVD-ROM, or ISO).
