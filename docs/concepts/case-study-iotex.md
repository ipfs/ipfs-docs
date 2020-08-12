---
title: 'Case study: IoTeX'
description: Explore some helpful use cases, ideas, and examples for the InterPlanetary File System (IPFS).
---

# Case study: IoTeX

::: callout
**"Working with IPFS to bridge our visions for a decentralized future has been incredibly rewarding. As IoTeX looks to further decentralize our tech stack and products, IPFS has been an amazing partner to expand the capabilities and security of IoTeX devices like Ucam. Our work on decentralized IoT firmware updates via IPFS is just a start &mdash; from storage to identity to data marketplaces, we look forward to working with IPFS and Filecoin to build full-stack decentralized solutions for IoT."**

_&mdash; Raullen Chai, CEO, IoTeX_
:::

## Overview

::: right
<img src="./images/case-studies/logo-iotex.png" alt="IoTeX logo" width="220">
:::

[IoTeX](https://iotex.io/), a privacy-centric blockchain platform for the Internet of Things (IoT), uses IPFS to deliver firmware updates for [Ucam](https://ucam.iotex.io/), a privacy-protecting surveillance camera for the consumer market. Ucam is using IPFS' decentralized storage network over HTTP by means of third-party pinning service [Pinata](https://pinata.cloud/). This enables IoTeX to provide a hybrid approach that's on the vanguard of IoT technology &mdash; integrating consumer electronics, a blockchain-based identity, and smart contracts along with IPFS-based distributed storage and the option to use conventional cloud storage if needed.

Why use IPFS specifically for delivering firmware? Unlike software updates, firmware updates have more power to modify critical hardware functions and keep malicious code hidden from virus scans. The IoTeX firmware validation process for Ucam addresses one of the major risks of today's IoT devices: the potential for malware to hijack the hardware itself. IoTeX's solution for firmware delivery uses a smart contract to enable devices to validate that firmware comes only from the authorized manufacturer or another authorized account.

Security vulnerabilities have long been a major hurdle for IoT devices. For consumers, this is particularly worrying with in-home cameras, given their glimpse into individuals' and families' personal space. IoTeX's IPFS-based firmware delivery system offers a major differentiation point versus other IoT cameras on the market. IoTeX Head of Business Development Larry Pang explains: "The hardware manufacturer of Ucam, Tenvis, identified privacy and user-centricity as a major trend when it comes to devices in people's homes. [Tenvis] came to us to enhance their cameras with the next big feature for security cameras: Privacy."

Like any IoT device, the Ucam surveillance camera employs a complex tech stack, which means that to create a fully privacy-preserving solution, several different layers of technology need to be addressed. However, firmware delivery is one of the most impactful &mdash; particularly because firmware delivery via conventional cloud storage leaves a lot to be desired. The biggest concern with using opaque, centralized cloud services is that there is no visibility into what happens at the storage nodes. If conventional cloud storage is tampered with or hacked, there is no way to track or discover the changes.

Combine this innovative firmware delivery mechanism with IoTeX's use of blockchain, and there's a lot happening in a small package. While IoT has long been touted as an important use case for blockchain, IoTeX is one of the first companies to actually combine a blockchain-based, decentralized (self-sovereign) identity, smart contracts, and distributed storage successfully in a mass-market consumer device. And while IoTeX's use of IPFS is currently for firmware delivery, this system is designed to be extended in the future for other sensitive data to be stored, retrieved, or delivered by a Ucam device. Using IPFS for firmware is a first step toward offering Ucam users the option of storing all of their data using IPFS.

::: callout
**"IPFS has a great team of people with ambition and a strong desire to change the world! IPFS and Filecoin perfectly fit into IoTeX's stack for continuously storing and processing billions of IoT devices around the world in a privacy-preserving and trustworthy way. In addition, we found the transparency level of IPFS high &mdash; the open code and docs are really helpful. Love it."**

_&mdash; Raullen Chai, CEO, IoTeX_
:::

### IoTeX by the numbers

<NumberBlock :items="[
  {value: '~5s', text:'global firmware download time (6.2MB file)'},
  {value: '1.5x', text: 'faster download time than Amazon S3'},
  {value: '&gt;500', text: 'pre-launch Ucam owners updating firmware weekly'}
]" />

## The story

Security cameras, sensors, and other in-home devices are quickly becoming ubiquitous in consumer settings, vastly increasing the potential surface area for hacks of people's home networks. "This is a very sensitive topic," says IoTeX Head of Business Development Larry Pang. "This device is for indoor use. It's going to be in your living room."

At the same time, manufacturers of IoT security products are looking for ways to differentiate. "This industry is hyper-saturated," says Pang. "If you look up 'security camera' on Amazon, there are more than 10,000 products. What we've decided to do is to take Tenvis' multi-generational camera hardware and power it with our decentralized technology. The purpose of this camera is that it's going to be private, which means everything is going to be owned by the user." To that end, IoTeX plans in the longer term to use IPFS for storage of rolling data for security cameras &mdash; firmware is just the start.

When it comes to delivering firmware, IoTex's IPFS-based solution provides three layers of protection:

- Only the operator with a valid IoTeX decentralized identity (DID) key can update the rollout policies for firmware
- Firmware files' validity is proven through a combination of hashed IPFS [content identifiers](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids) (CIDs), an IoTeX DID, and [IPNS](https://docs.ipfs.io/concepts/ipns/)
- The Ucam device itself locally verifies that the firmware codesign is valid

Tenvis, Ucam's manufacturer, makes firmware available on IPFS using the Pinata pinning service. The firmware query and retrieval process works as follows:

- Each Ucam device queries a smart contract on a daily basis during its idle time
- The device checks the latest version on IPFS and compares it to the firmware that is running on the camera
- If the camera detects a more recent upgrade to the firmware, it checks the codesign, validates the DID of the uploading entity, and compares it to the valid manufacturer DID
- If the firmware is confirmed from a trusted source, the camera installs the new update

IoTeX is using a sophisticated implementation of the [DID specification](https://www.w3.org/TR/did-core/) that includes every agent in the system — not only does every individual human have a self-sovereign identity with a cryptographic signature, but all devices, vendors, and other entities also each have their own identity. This DID is a unique identifier that can be validated on the IoTeX blockchain as belonging to the verified device, individual, or company that has the key to that unique identifier. For firmware updates, this means that IoTeX facilitates manufacturers to codesign legitimate firmware based on the DID and ensures devices can only download legitimate ones. The firmware updates themselves are stored using IPFS. Each firmware update includes a DID of the entity that uploaded the firmware, so the device can confirm that the update comes from a verifiable and recognizable source based on the DID issued by IoTeX. When a Ucam device inspects an available firmware update, they refer to the IoTeX blockchain to validate that these files were stored on IPFS by a trusted source based on the DID. By creating a validation system that guarantees the validity of a particular firmware update, IoTeX can prevent hackers from taking over cameras with rogue firmware updates.

The fact that IPFS provides unique, hashed CIDs in conjunction with updateable human-readable [InterPlanetary Name System](https://docs.ipfs.io/concepts/ipns/) (IPNS) addresses also provides unique advantages for ensuring provenance and file integrity. The IPNS addressing system prevents tampering with the URL, meaning that the Ucam is always correctly routed to valid firmware.

"Deploying a maliciously modified version of the firmware to devices to exploit or control them is a real threat in IoT space," says IoTeX CEO Raullen Chai. "Provenance protection proves who originally issues the firmware, while integrity protection makes sure the firmware itself is not tampered by anyone sitting in the middle. IPFS's content hash provides natural integrity protection, while IPNS's resolution capability provides the guarantee for the provenance of firmware."

In addition to these security benefits, the IoTeX team also discovered that the way that IPFS propagates files over the network offers a unique way to control the rollout pace of new firmware. Firmware updates tend to have a pattern of being picked up slowly at first, with an increase in downloads building slowly towards a peak of demand two to three weeks after the initial firmware release, and then a slowdown after the peak. When a new firmware update is released, almost nobody wants an earlier version. IPFS naturally provides elasticity for this pattern of buildup and scale-down of demand. More nodes provide content in times of high demand, and garbage collection on IPFS nodes discards content that hasn't been used for a while &mdash; meaning that IPFS automatically provides storage space scaling based on utilization.

For releasing and shipping new firmware updates, IoTeX describes their approach as defining a rollout geo-fence to "warm up the IPFS cache". The initial rollout goes to a set of trusted canary devices in a specific geolocation, and then IPFS nodes in other locations pick up the latest firmware and make it available for other Ucam units to upgrade. When a Ucam camera initiates a firmware update, Pinata facilitates delivery from nearby IPFS nodes, resulting in rapid response and download times that are even faster than a traditional CDN-style configuration; in fact, IoTex estimates an average 1.5x faster download time than that provided by Amazon S3.

Other than the use of the cryptographic key, the manufacturer has the same experience using IPFS than they would serving official firmware from a centralized cloud service &mdash; but with the benefit of end-to-end transparency that the IoTex team believes is essential over the long run. "We consider maintaining end-to-end trust throughout the entire data lifecycle as you perform different activities on [data]," says Pang. "Putting it into a centralized system chops that end-to-end trust right there, because you have no way to prove that behind the scenes it wasn't manipulated."

::: callout
**"If you think about all these software hacks of today, they are not immediately apparent. These are like sleeper cells that live inside of your computer for months on end. And by that time, they've collected all of your keystrokes, all of your activity, all this information. Who knows what access that your computer has to other services? Just imagine that being put into your home network — an entryway to the home system through a sleeper cell in your camera or any other device in your home. There are many layers of technology that need to be secured, and firmware protection is just a start."**

_&mdash; Larry Pang, Head of Business Development, IoTeX_
:::

In an age when software or firmware updates can mean risking loss of control for hardware running from the smallest IoT device to something as large a self-driving car, firmware plays an absolutely critical role for security — which is why the IoTeX team is beginning with protecting firmware updates, not just for cameras, but for any IoT device. To that end, the team has created a generalized library that is applicable to firmware updates for connected devices of any variety.

Additionally, because IoTeX's sophisticated use of DID means every entity has its own unique identifier, every device and individual in the system develops its own reputation. Over time, it will be possible for devices to understand and make decisions about the most reputable service providers for any type of file acquisition or file storage.

Pang points out that hackers don't need to use sophisticated methods to get malware installed on people's systems. It's fairly simple to get people to click on a malicious link, or to find devices without the latest security updates. "Going to the right sources for what you need is going to be a trend," says Pang. "It's no longer trust by association, but trust by doing your own research."

## IPFS benefits

In terms of concrete benefits, the IoTeX team cites the following as key wins of using IPFS:

- **Security:** Prevents man-in-the-middle risks and rogue firmware attacks that can be used to steal data and credentials
- **Trust:** Verifies and validates distributors of firmware, enabling hardware owners to update with full confidence
- **Performance:** 1.5 times faster than comparable AWS S3 times for firmware downloads
- **Reliability:** Distributed storage brings firmware updates closer to the cameras themselves, boosting speed and reliability of over-the-air (OTA) updates with no increase in infrastructure costs
- **Version control:** Automatic availability scaling for high-demand files, plus automatic discarding of old versions that are no longer in demand
- **Cost-effectiveness:** Projected lowered costs and competitive pricing compared to cloud services such as AWS, particularly after future integration with Filecoin
- **Multi-functionality:** Future ability to use Filecoin alongside IPFS to store camera data, resulting both in enhanced user privacy and competitive pricing
- **Interoperability and flexibility:** The open nature of IPFS allows for multiple service providers and creates the future potential for different service level agreements, add-ons, or pricing models

## How IoTeX uses IPFS

For delivery of firmware, IoTeX relies upon the Pinata pinning service for content-addressed data persistence and delivery. In addition, the team has built a generalized library for pushing firmware updates to connected devices.

As IoTeX's use of and integration with IPFS expands over time beyond firmware delivery, the Ucam devices themselves (or any other IoTeX IoT device) will act as individual IPFS nodes, facilitating storage and delivery of the data an individual device collects, stores, or delivers.

## IoTeX + IPFS: the future

The IoTeX team is planning to expand its use of IPFS and Filecoin both with the Ucam and other devices. In addition to their future plans with Ucam, the team is in discussions with out-of-home surveillance camera manufacturers and have also been working with a supplier of "trusted tracker" devices that can measure everything from geolocation to temperature, light, motion, and vibrational shock. Combining such multifunctional devices with big-data processing creates tremendous potential for data stores that are useful in a variety of applications &mdash; as well as a significant opportunity for IoT device owners to monetize their data while still preserving their personal privacy. IoTeX sees IPFS, particularly in tandem with Filecoin, as having the potential to give people sovereignty over their data while also benefiting from its use.

For Ucam users specifically, IoTeX currently offers an AWS-based that allows users to store data for a few days or weeks at a nominal fee, but many users are already asking for storage that better aligns with their privacy goals. To achieve this, IoTeX plans to use IPFS in combination with Filecoin. Furthermore, an IPFS/Filecoin combo has the potential to unlock competitive pricing for long-term storage of video data &mdash; a known need for individuals and companies alike who want to retain video footage for months or years for uses such as evidence for liability and insurance. Traditional cloud storage of such large amounts of video data can be cost-prohibitive, but Filecoin storage has the potential to make long-term storage much more affordable.

The IoTeX team also sees the possibilities provided by IPFS as part of a larger framework of privacy- and security-oriented solutions. As IoT devices become ubiquitous, IoTeX stands at the forefront of implementing solutions that can provide verifiable privacy and higher levels of security than centralized services, regardless of the use case of an individual IoT device.

"It's always been top of mind for us to connect reputable service providers to the IoTeX network," explains Pang. "IPFS provides a very horizontal service that all the blockchains need."

_Note: Metrics and other details in this case study are current as of August 2020. Details may change in the interim._
