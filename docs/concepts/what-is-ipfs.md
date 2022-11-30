---
title: What is IPFS?
description: Learn about IPFS, the InterPlanetary File System, how it works, and why it's important to the future of the internet.
---

# What is IPFS?

Let's just start with a one-line definition of IPFS:

**IPFS is a distributed system for storing and accessing files, websites, applications, and data.**

What does that mean? Let's say you are doing some research on aardvarks. (Just roll with it; aardvarks are cool! Did you know they can tunnel 3 feet in 5 minutes?) You might start by visiting the Wikipedia page on aardvarks at:

```
https://en.wikipedia.org/wiki/Aardvark
```

When you put that URL in your browser's address bar, your computer asks one of Wikipedia's computers, which might be somewhere on the other side of the country (or even the planet), for the aardvark page.

Enter IPFS. There's a mirror of Wikipedia stored on IPFS, and you could use that instead. If you use IPFS, your computer asks to get the aardvark page like this:

```
/ipfs/bafybeiaysi4s6lnjev27ln5icwm6tueaw2vdykrtjkwiphwekaywqhcjze/wiki/Aardvark
```

:::tip
The easiest way to view the above link is by opening it in your browser through an _IPFS Gateway_. Add `https://ipfs.io` to the start of the above link and you'll be able to [view the page →](https://ipfs.io/ipfs/bafybeiaysi4s6lnjev27ln5icwm6tueaw2vdykrtjkwiphwekaywqhcjze/wiki/Aardvark)
:::

IPFS knows how to find that sweet, sweet aardvark information by its [contents](content-addressing.md), not its location (more on that below). IPFS represents the aardvark by that string of numbers in the middle of the URL (`baf…`), and instead of asking one of Wikipedia's computers for the page, your computer uses IPFS to ask lots of computers around the world to share the page with you. It can get your aardvark info from anyone who has it, not just Wikipedia.

And, when you use IPFS, you don't just download files from someone else — your computer also helps distribute them. When your friend needs the same Wikipedia page, they might get it from you, your neighbor or anyone else using IPFS.

Along with web pages, IPFS makes this possible for any kind of file a computer might store, whether it's a document, an email, or even a database record.

## Decentralization

Making it possible to download a file from more than one location that aren't managed by one organization:

- **Supports a resilient internet.** If someone attacks Wikipedia's web servers or an engineer at Wikipedia makes a big mistake that causes their servers to catch fire, you can still get the same web pages from somewhere else.
- **Makes it harder to censor content.** Because files on IPFS can come from more than one place, it's harder for anyone (whether they're states, corporations, or someone else) to block things. We hope IPFS can help provide ways to circumvent actions like these when they happen.
- **Can speed up the web when you are far away or disconnected.** If you can retrieve a file from someone nearby instead of hundreds or thousands of miles away, you can often get it faster. This is valuable if your community has a local network, but doesn't have a good connection to the wider internet. (Well-funded organizations with technical expertise do this today by using more than one data center [content distribution networks](https://en.wikipedia.org/wiki/Content_delivery_network). IPFS hopes to make this possible for everyone.)

That last point is actually where IPFS gets its full name: the **InterPlanetary File System**. We're striving to build a system that works across places as disconnected or as far apart as planets. While that's an idealistic goal, it keeps us working and thinking hard, and almost everything we create in pursuit of that goal is also useful here at home.

## Content addressing

::: call out
For a beginner-friendly primer on why cryptographic hashing and content addressing matter, take a look at ProtoSchool's tutorial, [Content Addressing on the Decentralized Web](https://proto.school/content-addressing).
:::

What about that link to the aardvark page above? It looked a little unusual:

```
/ipfs/bafybeiaysi4s6lnjev27ln5icwm6tueaw2vdykrtjkwiphwekaywqhcjze/wiki/Aardvark
```

That jumble of letters after `/ipfs/` is a [_content identifier_](content-addressing). It’s how IPFS can get content from more than one place.

Traditional URLs and file paths such as…

- `https://en.wikipedia.org/wiki/Aardvark`
- `/Users/Alice/Documents/term_paper.doc`
- `C:\Users\Joe\My Documents\project_sprint_presentation.ppt`

…identify a file by _where it's located_ — what computer it's on, and the files location on the hard drive. That doesn't work if the file is on your neighbor's computer and your friend's across town.

Instead of being location-based, IPFS addresses a file by _what's in it_, or by its _content_. The content identifier above is a _cryptographic hash_ of the content at that address. The hash is unique to the content that it came from, even though it may look short compared to the original content. It also allows you to verify that you got what you asked for — bad actors can't just hand you content that doesn't match. (If hashes are new to you, check out [the concept guide on hashes](hashing.md) for an introduction.)

::: tip NOTE
Why do we say "content" instead of "files" or "web pages" here? Because a content identifier can point to different types of data, such as a single small file, a piece of a larger file, or metadata. (In case you don't know, metadata is "data about the data." You use metadata when you access the date, location, or file size of your digital pictures, for example.) An individual IPFS address can refer to the metadata of just a single piece of a file, a whole file, a directory, a whole website, or any other kind of content. For more on this, check out our guide to [how IPFS works](how-ipfs-works.md).
:::

Because the address of a file in IPFS comes from the content itself, links in IPFS can't change. For example ...

- If the text on a web page changes, the new version gets a new, different address.
- Content can't move to a different address. On today's internet, a company could reorganize content on their website and move a page at `http://mycompany.com/what_we_do` to `http://mycompany.com/services`. In IPFS, the old link you have would still point to the same old content.

Of course, people want to update and change content all the time and don't want to send new links every time they do it. This is entirely possible in an IPFS world, but explaining it requires a little more info than what's within the scope of this IPFS introduction. Check out the concept guides on [IPNS](ipns.md) and the [Mutable File System (MFS)](file-systems.md#mutable-file-system-mfs), to learn more about how changing content can work in a content-addressed, distributed system.

It's important to remember that, in these situations, using IPFS is participatory and collaborative. If nobody using IPFS has the content identified by a given address available for others to access, you won't be able to get it. But, as long as _someone_ makes it available from IPFS, you can fetch the content, whether that person is the original author or not. Note that this is like the current web, where it's also impossible to remove content that's already copied across an unknowable number of websites; the difference with IPFS is that you are always able to find those copies.

## Participation

While there's lots of complex technology in IPFS, the fundamental ideas are about changing how networks of people and computers communicate. Today's World Wide Web rests on the concepts _ownership_ and _access_, meaning that you get files from whoever owns them — if they choose to grant you access. IPFS relies on the ideas of _possession_ and _participation_, where people _host_ each others' files and _help_ in making them available.

That means IPFS works when people are actively participating. If you use your computer to share files using IPFS, but then you turn your computer off, other people won't be able to get those files from you anymore. But if you or others store copies of those files on more than one computer that's powered on and running IPFS, those files will be more reliably available to other IPFS users who want them. This happens to some extent automatically: by default, your computer shares a file with others for a limited time after you've downloaded it using IPFS. You can also make content available more permanently by _pinning_ it, which saves it to your computer and makes it available on the IPFS network until you decide to _unpin_ it. (You can learn more about this in our [guide to persistence and pinning](persistence.md).)

If you want to make sure one of your own files is permanently shared on the internet today, you might use a for-pay file-sharing service like Dropbox. Some people have begun offering similar services based on IPFS called _pinning services_. But since IPFS makes this kind of sharing a built-in feature, you can also collaborate with friends or partner with institutions (for example, museums and libraries might work together) to share each others' files. We hope IPFS can be the low-level tool that allows a rich fabric of communities, business, and cooperative organizations to all form a distributed web that is much more reliable, robust, and fair than the one we have today.