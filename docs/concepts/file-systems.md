---
title: File systems
legacyUrl: https://docs.ipfs.io/guides/concepts/mfs/
description: Learn about file systems in IPFS and why working with files in IPFS can be a little different than you may be used to.
---

# File systems and IPFS

Working with files in IPFS can be a little different than you're used to for several different reasons:

- Content addressing means that when files change, their addresses change, too
- Files may be too big to fit in a single block, so they need metadata to keep blocks together

MFS and UnixFS can help you address these new ways of thinking of files.

::: tip
If you're interested in how MFS and UnixFS play into how IPFS works with files in general, check out this video from IPFS Camp 2019! [Core Course: How IPFS Deals With Files](https://www.youtube.com/watch?v=Z5zNPwMDYGg)
:::

## Mutable File System (MFS)

Because files in IPFS are content-addressed and immutable, they can be complicated to edit. Mutable File System (MFS) is a tool built into IPFS that lets you treat files like you would a normal name-based filesystem — you can add, remove, move, and edit MFS files and have all the work of updating links and hashes taken care of for you.

### Working with files API 

MFS is accessed through the files commands in the IPFS CLI and API. The commands on the files API take the format of `ipfs.files.someMethod()`. These methods are used to:

#### Create a directory

The MFS method `ipfs.files.mkdir` creates a new directory at a specified path. For example, to add a directory `example` to our root directory (`/`), run: 

````
await ipfs.files.mkdir('/example')
````

If you want to create a new directory nested under others that don't yet exist, you need to explicitly set the value of `parents` to `true`, like so:

````
await ipfs.files.mkdir('/my/directory/example', { parents: true })
````

#### Check directory status

The method, `ipfs.files.stat` enables you to check the status of a file or directory on your IPFS node. To check the status of a directory called `example` located within the root directory, you could call the method by running: 

````
await ipfs.files.stat('/example')
````

This method returns an object with a `cid`, `size`, `cumulativeSize`, `type`, `blocks`, `withLocality`, `local`, and `sizeLocal`.  This returned data is the essential information about the directory. 

```` 
// {
//   hash: CID('QmXmJBmnYqXVuicUfn9uDCC8kxCEEzQpsAbeq1iJvLAmVs'),
//   size: 60,
//   cumulativeSize: 118,
//   blocks: 1,
//   type: 'directory'
// }
````

If you add, move, copy, or remove a file into a directory the hash of you directory will change with every file modified. 

#### Add a file to MFS

To add a file to IPFS, use the MFS `ipfs.files.write` method using the command: 

````
await ipfs.files.write(path, content, [options])
````
::: tip

This method can create a brand new file, that accepts file `content` in multiple formats, in a specified `path` within the IPFS instance by providing the boolean option {` create: true` }.

:::

If you, for example, have a file object accessible via a variable `examplePic` that you wanted to add it to the root directory and have it named `example.jpg`, you could run:

````
await ipfs.files.write('/example.jpg', examplePic, { create: true })
````

This method does not provide a return value. 

#### View contents of a directory

To check whether the `ipfs.files.write` method has worked as expected, you can use the `ipfs.files.ls` method to inspect directories on the MFS. You can do this by running: 

````
await ipfs.files.ls([path], [options])
````

The method will default to listing the contents of your directory (`/`), or you can choose to specify a specific `path` (directory) you'd like to inspect such as `/example`.

This method produces an array of objects for each file or directory with properties such as `name`, `type`, `size`, `cid`, `mode`, and `mtime`. If you wanted to inspect the contents of a `/example` directory, run: 

````
await ipfs.files.ls('/example')
````

#### Copy a file or directory

In the Mutable File System, like traditional systems, you can copy a file or directory to a new location while also leaving it intact at its source. 

You can do this by using the method: 

````
await ipfs.files.cp(...from, to, [options])
````

::: tip

This method offers two formatting options for passing the `from` key: 

- an existing MFS path to a file or a directory in your own node (e.g. `/my-example-dir/my-example-file.txt`)
- an IPFS path to a file or directory hosted either by you or by a peer (e.g. `/ipfs/QmWc7U4qGeRAEgtsyVyeW2CRVbkHW31nb24jFyks7eA2mF`)

:::

The `to` key is the destination path in MFS, and there's an option {` create: true` } that can be used to create parent directories that don't already exist. 

You can use this method to perform different operations including:

````
// copy a single file into a directory
await ipfs.files.cp('/example-file.txt', '/destination-directory')
await ipfs.files.cp('/ipfs/QmWGeRAEgtsHW3ec7U4qW2CyVy7eA2mFRVbk1nb24jFyks', '/destination-directory')

// copy multiple files into a directory 
await ipfs.files.cp('/example-file-1.txt', '/example-file-2.txt', '/destination-directory')
await ipfs.files.cp('/ipfs/QmWGeRAEgtsHW3ec7U4qW2CyVy7eA2mFRVbk1nb24jFyks',
 '/ipfs/QmWGeRAEgtsHW3jk7U4qW2CyVy7eA2mFRVbk1nb24jFyre', '/destination-directory')

// copy a directory into another directory
await ipfs.files.cp('/source-directory', '/destination-directory')
await ipfs.files.cp('/ipfs/QmWGeRAEgtsHW3ec7U4qW2CyVy7eA2mFRVbk1nb24jFyks', '/destination-directory')
````

#### Move a file or directory

MFS allows you to move files between directories using the `ipfs.files.mv` which looks like this:

````
await ipfs.files.mv(from, to, [options])
````
`from` is the source path (or paths) of the content you'd like to move while `to` is the destination path.

You can use this method to perform different operations including:

````
// move a single file into a directory
await ipfs.files.mv('/example-file.txt', '/destination-directory')

// move a directory into another directory
await ipfs.files.mv('/source-directory', '/destination-directory')

// overwrite the contents of a destination file with the contents of a source file
await ipfs.files.mv('/source-file.txt', '/destination-file.txt')

// move multiple files into a directory
await ipfs.files.mv('/example-file-1.txt', '/example-file-2.txt', '/example-file-3.txt', '/destination-directory')
````

#### Read the contents of a file

The `ipfs.files.read` method allows you to read and, or display the contents of a file in a buffer. The method takes the format:

````
ipfs.files.read(path, [options])
````
The `path` provided is the path of the file to read, and it must point to a file rather than a directory.


#### Remove a file or directory

MFS allows you to remove files or directories using the method:

````
await ipfs.files.rm(...paths, [options])
````

`paths` are one or more paths to remove.

By default, if you attempt to remove a directory that still has contents, the request will fail. To remove a directory and everything contained in it, you'll need to use the option {` recursive: true `}.

````
// remove a file
await ipfs.files.rm('/my/beautiful/file.txt')

// remove multiple files 
await ipfs.files.rm('/my/beautiful/file.txt', '/my/other/file.txt')

// remove a directory and its contents
await ipfs.files.rm('/my/beautiful/directory', { recursive: true })

// remove a directory only if it is empty
await ipfs.files.rm('/my/beautiful/directory')
````

## Unix File System (UnixFS)

When you add a _file_ to IPFS it might be too big to fit in a single block, so it needs metadata to link all its blocks together. UnixFS is a [protocol-buffers](https://developers.google.com/protocol-buffers/)-based format for describing files, directories, and symlinks in IPFS. This data format is used to represent files and all their links and metadata in IPFS. UnixFS creates a block (or a tree of blocks) of linked objects. 

UnixFS currently has [Javascript](https://github.com/ipfs/js-ipfs-unixfs) and [Go](https://github.com/ipfs/go-ipfs/tree/b3faaad1310bcc32dc3dd24e1919e9edf51edba8/unixfs) implementations. These implementations have modules written in to run different functions: 

- **Data Formats**: manage the serialization/deserialization of UnixFS objects to protocol buffers

- **Importer**: Build DAGs from files and directories

- **Exporter**: Export DAGs

### Data Formats

On UnixFS-v1 the data format is represented by this protobuf: 

````
message Data {
	enum DataType {
		Raw = 0;
		Directory = 1;
		File = 2;
		Metadata = 3;
		Symlink = 4;
		HAMTShard = 5;
	}

	required DataType Type = 1;
	optional bytes Data = 2;
	optional uint64 filesize = 3;
	repeated uint64 blocksizes = 4;
	optional uint64 hashType = 5;
	optional uint64 fanout = 6;
	optional uint32 mode = 7;
	optional UnixTime mtime = 8;
}

message Metadata {
	optional string MimeType = 1;
}

message UnixTime {
	required int64 Seconds = 1;
	optional fixed32 FractionalNanoseconds = 2;
}
````

This `Data` object is used for all non-leaf nodes in Unixfs:

- For files that are comprised of more than a single block, the `Type` field will be set to `File`, the `filesize` field will be set to the total number of bytes in the files, and `blocksizes` will contain a list of the filesizes of each child node. 

- For files comprised of a single block, the `Type` filed will be set to `File`, `filesize` will be set to the total number of bytes in the file and file data will be stored in the `Data` field. 

UnixFS also supports two optional metadata format fields: 

- `mode` - used for persisting the file permissions in [numeric notation](https://en.wikipedia.org/wiki/File_system_permissions#Numeric_notation). If unspecified this defaults to `0755` for directories/HAMT shards and `0644` for all the other types where applicable.

- `mtime` - is a two-element structure (`Seconds`, `FractionalNanoseconds`) representing the modification time in seconds relative to the unix eposch `1970-01-01T00:00:00Z`.

### Importer

Importing a file into unixfs is split into two processes. A chunking function, and a layout function. You can test out how all this different features work using the IPFS [DAG builder](https://dag.ipfs.io)

#### Chunking

When an object is added to IPFS, it is chunked up into smaller parts, each part is hashed, and a CID is created for each chunk. This DAG building process has two main parameters, the leaf format and the chunking strategy. 

The leaf format takes two format options, Unixfs leaves and raw leaves:

- The Unixfs leaves format adds a data wrapper on newly added objects to produce UnixFS leaves with additional data sizes. This wrapper is used to determine whether newly added objects are files or directories. 

- The raw leaves format is the default format on IPFS where nodes output from chunking will be raw data from the file with a CID type of `'raw'`. This is mainly configured for backwards compatibility with formats that used a Unixfs Data object.

The chunking strategy is used to determine the size options available during the chunking process. The strategy currently has two different options, 'fixed size' and 'rabin'. 

- Fixed sizing will chunk the input data into pieces of a given size, on IPFS this could be 512 bytes, 1024 bytes, and more. The smaller the byte size, the better the deduplication of data. 

- Rabin chunking will chunk the input data using rabin fingerprinting to determine the boundaries between chunks. Rabin also reduces the number of input data chunked nodes. 

#### Layout

Layout defines the shape of the tree that gets built from the chunks of the input file.

There are currently two options for layout, balanced, and trickle. Additionally, a 'max width' must be specified. The default max width is 174.

The balanced layout creates a balanced tree of width 'max width'. The tree is formed by taking up to 'max width' chunks from the chunk stream, and creating a unixfs file node that links to all of them. This is repeated until 'max width' unixfs file nodes are created, at which point a unixfs file node is created to hold all of those nodes, recursively. The root node of the resultant tree is returned as the handle to the newly imported file.

If there is only a single chunk, no intermediate unixfs file nodes are created, and the single chunk is returned as the handle to the file.

### Exporter

To export or read the file data out of the unixfs graph, perform an in order traversal, emitting the data contained in each of the leaves.

## Further resources

You can find additional resorces to familiarize with these file systems at: 

- [Protoschool MFS course](https://proto.school/#/mutable-file-system)
- [Understanding how the InterPlanetary File System deals with Files](https://github.com/ipfs/camp/tree/master/CORE_AND_ELECTIVE_COURSES/CORE_COURSE_A), from IPFS Camp 2019
- [Jeromy Coffee Talks - Files API](https://www.youtube.com/watch?v=FX_AXNDsZ9k)
- [UnixFS Specification](https://github.com/ipfs/specs/blob/master/UNIXFS.md)

