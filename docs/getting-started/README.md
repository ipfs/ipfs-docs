---
title: Getting started
description: Start your IPFS journey here! Learn how the Interplanitery File System works, install commonly used tools, and get to grips with basic d-web concepts.
---

# Getting started

The InterPlanetary File System (IPFS) is a set of protocols that allow computers to share data using peer-to-peer networks instead of relying on central servers. The project started as a response to critical issues surrounding the internet, and is designed to replace HTTP and grow to an interplanetary scale. This section covers the issues that IPFS fixes, how it manages those solutions, and how you can build on top of the protocol.

## Problems with the internet

HTTP is the protocol that most of internet runs on, and it has three major problems:

1. Finding files is hard.
1. There is no built-in verification.
1. Centralized servers and ineficient.

### Finding files

Currently, computers on the internet share files using fixed-addresses. If Laika wants to get a file on Albert's computer, Laika needs to know:

1. The IP address of Albert's computer.
1. The name of the file.
1. The location of the file.

The address of a file would look something like this:

```profile
151.101.2.133/public/images/spaceships/uss-enterprise.png
|           ||                        ||                |
 -----------  ------------------------  ----------------
      |                  |                      |
 IP address           Location              File name
```

This approach comes with problems. What if Albert's computer is offline or unavailable? Albert _could_ store a copy of the file on another computer for redundancy, but then Laika also needs to know the address of _that_ backup computer. That backup computer would also need the exact same directory structure as Albert's original computer. What if Albert moves the file to a different location? Now the address Laika has is wrong. And if Laika manages to find the new address, the file's address on the backup computer is still incorrect, so you'd have to update the file's location on _that_ computer as well. Albert _could_ install a load-balancer on his network, but now he has another piece of hardware to maintain, when all he wanted to do was share a file with Laika!

These are all issues with how to find data, but there are more pressing concerns when it comes to validating the data that Laika receives. Using the protocols the majority of the internet runs off, there is no built-in way to validate that the data you are requesting is the data that you want to receive.

### Validation of data

Laika works on the internation space station (ISS) and one of her tasks is to order food for the crew. Every week she records the stock levels within the ISS kithen and fills out a form detailing what the crew needs. She then sends this form to ground control. Once ground control receives the order, they pass it off to the robots who lilligently fulfill the order, pack it all into a rocket, and send it up to the ISS.

Gordo also works on the ISS, and has a crippling addiction to coconut oil. But Gordo has a plan. Just moment after Laika has dispatched the order form, Gordo intercepts it, adds another thousand jars of coconut oil, and forwards the form off to ground control. Ground control forwards the order to the trusty robots who dutifully fulfill it, pack everything up into a rocket, and send it towards the ISS. When the food rocket arrives, the crew find themselves swimming in jars of coconut oil, can't complete their tasks, and the mission inevitably fails, along with any hopes of humans colonising outer space. Too bad the transmission protocol used by the ISS didn't have built-in validation.

#### Nook's version of War & Peace

While the story of Laika and Gordo might be a bit farfetched, consider what happened to Nook in 2012. Nook makes e-book readers and is a competitor to Amazon's Kindle. In the early 2010s Nook users reading War & Peace noticed some irregularities. Throughout the book the word _kindle_ had been replaced with _nook_. So instead of the fire being _kindled_, the fire was _nookd_. Someone at Nook had ran a lazy find-and-replace, presummably because they had copied a lot of ebooks over from Amazon's Kindle library. Nook eventually addressed the issue by correcting their mistake. But it begs the question, how many people read this verion of War & Peace and assumed that Tolstoy was just bad at spelling?

While the situation with Nook is fairly entertaining, it's also a bit scary. Nook users trusted that the books they were getting were the official versions, and hadn't been manipulated in some way. Changing _kindle_ to _nook_ doesn't seem particularly naffarious, but would that be the case if a nation-state was in charge of sharing information? With no built-in way to validate files, how can users be sure that the data they've been given is correct?

### Centralized control

The vast majority of the internet is controled by a few major companies. AWS is the biggest provider of web services in the western world, with Google Cloud Computing Services and Microsoft's Azure Cloud Platform not too far behind. While this is fairly conveinent for web developers, it creates a lot of issues for users.

With information and access to sevices controls by a handful of companies, it's very easy for those companies to restirct access. It's also easier for government to force companies into only sharing information that the government deems suitable.

<!--
- Handful of companies control the vast majority of stuff.
- It's very hard to exit the bubble once you're in it.
- Centralization leads to unethical advertising practices:
    - Tracking of users on every site they go to.
    - Vast collections of personal data that companies hoard and then sell to each other.
- Easy for companies or governments to restrict access to information.
-->

## Solutions to these problems

:
