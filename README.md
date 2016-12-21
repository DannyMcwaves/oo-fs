# FS - UTIL
#### Object Oriented file handling with node.

```javascript
let fs-util = require("fs-util");
// fs-util is an object that contains Directory class, File class and open function.
// fs-util = {Directory, File, open} -- es6 format.
```

## FEATURES
**The package has four class and one function.**
**NB: of these classes, you will need just the Directory, the File and the open function.**
- [x] Base
- [x] Directory
- [x] File
- [x] FSError
- [x] open

## BASE
this is the base class providing almost all the major API's for the rest of the other
classes available in the package. All the methods on this treated as properties.

**`constructor(pathname)`**
```
    call the constructor without a pathname parameter and it uses the current working directory.
```

**`dirname`** --> baseDirectory:String
```
    returns the base directory of this pathname
    eg. /media/you/project returns /media/you
```

**`basename`** --> basename:String
```
    returns the basename of the pathname.
    eg. /media/you/project returns project
```

**`pathname`** --> pathname:String
```
    get the name of the path by calling it as a property.
```

**`set pathname(value)`** --> null
```
    change the name of the path.
    base.pathname = newpath;
```

**`join(other)`** --> path:String
```
    joins this pathname with another.
```

**`stats`** --> stats:Object
```
    returns some statistic about the file.
```

**`exists`** --> true | false
```
    returns true or false as to the path's existence.
```

**`type`** --> file | directory:String
```
    this return the type of path it is. either directory or a file
```

**`read`** --> contentOfDirectory:Array | contentOfFile:Promise
```
    reads the content of the path.
```


## Directory
###### Directory extends Base
this class take a path that is directory.
if the path given is not a directory, it throws an error and this where the FSError comes in.
It is nothing really important, just a custom error class that is thrown in the package.

**`constructor(pathname)`**
```
    call the constructor without a pathname parameter and it uses the current working directory.
    let dir = new Directory(pathname)
```

**`*[Symbol.hasInstance](other)`**
```
    provides instanceof support for checking against other objects for instances.
    console.log(dir  instanceof  Directory) returns true
```

**`*[Symbol.iterator]()`**
```
    provide support for iterating through the content of a directory.
    for (let i of dir) {console.log(i)} you can loop through the content of the directory.
```

**`addFile(name="newFile.txt", overwrite=false)`** --> true:Promise if file is created
```
    if the not overwrite and the file exists, it is not recreated.
    if overwrite and the file exists, it is truncated.
    it returns a promise that resolves the file descriptor if the file is successfully created;
    else it returns the promise that rejects the error.
    dir.addFile("newFile.txt")[.then(whatever, whatever)]
```

**`addDirectory(name="new folder")`** --> true:Promise if directory is created.
```
    adds a new directory if it does not exist.
    it returns a promise that resolves the true else
    it returns the promise that rejects the err;
    dir.addDirectory("newDir")[.then(whatever, whatever)]
```

**`removeFile(name)`** --> true:Promise if file is removed
```
    removes an empty file.
    returns a promise that throws an error when the file is not available
    or resolves true if the file is removed.
    dir.removeFile("unwantedFile")[.then(whatever, whatever)]
```

**`removeDirectory(name)`** --> true:Promise if directory is removed
```
    removes an empty directory if it exists or throws an error directory does not exist.
    it returns a promise that resolves the true else
    it returns the promise that rejects the err;
    dir.removeDirectory("unwantedDir")[.then(whatever, whatever)]
```

**`search(value)`** --> matches:Array
```
    returns every possible value of the search available in this directory or and sub directories
    dir.search("open")
```

**`watch`** ---> filename:Promise
```
    returns a promise that resolves the name of the file modified in this directory.
    dir.watch.then((file) => {console.log(file)}, undefined); Feature still under dev't ,
    might not work properly.
```


## File
###### File extends Base
this class take a path that is file.
if the path given is not a file, it throws an error and this where the FSError comes in.
It is nothing really important, just a custom error class that is thrown in the package.

**`constructor(pathname)`**
```
    takes the name of the path leading to the file.
    throws an error if the pathname is not a file.
    eg: file = new File(pathname);
```

**`write(data)`** true:Promise if data is written
```
    truncate the content of the current file if available.
    else starts writing a new content to the file.
    it returns a promise that resolves the true else
    it returns the promise that rejects the err;
    file.write("this is me again")[.then(whatever, whatever)]
```

**`append(data)`** true:Promise if data is appended
```
    append data to this file easily.
    it returns a promise that resolves true else
    it returns the promise that rejects the err;
    file.append("Danny Mcwaves")[.then(whatever, whatever)]
```

**`delete()`** true:Promise if file is deleted
```
    deletes this file
    it returns a promise that resolves true else
    it returns the promise that rejects the err;
    file.delete()[.then(whatever, whatever)]
```

**`rename (newName)`** --> true:Promise if file is renamed
```
    renames this current file and will change the current pathname.
    it returns a promise that resolves true else
    it returns the promise that rejects the err;
    file.rename("file.txt")[.then(whatever, whatever)]
```

**`writeStream`** --> emits a write event
```
    returns a promise of a writable stream.
    returns a stream of the file for writing in a promise.
    file.writeStream.write("what in the world")
```

**`readStream`** --> emits an event
```
    creates and returns a readStream from the current file.
    returns a stream of the file for reading in a promise.
    file.readStream.on("data", console.log(data))
```

## open
###### returns a File Object or a Directory Object based on the file passed.
It throws an error if the file path passed does not exist


## USAGE
you needs to have a node runtime

**`npm install fs-util`**

```javascript
    let {Directory, File, open} = require("fs-util")
    let dir = new Directory("path-to-dir");
    let file = new File("path-to-file")
    let mypath = open("this-path-i-want-to-open")
    // returns a Directory object or File object based on the path
    // refer to docs above on the functionalities
```


## Need help?
Feel free to [create an issue](http://github.com/DannyMcwaves/fs-util/issues), [tweet me](http://twitter.com/DannyMcwaves), or [send me an email](mailto:johnschneider.remote@gmail.com). I'd be glad to help where I can! Can you make this repo better. Please CONTRIBUTE to it.

:smile::smile::smile::smiley::+1::+1::+1::ok_hand::metal::hand::raised_hands::muscle::clap::wave:
