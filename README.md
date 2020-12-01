# This is a MERN(mongodb, express, react and nodejs) stack CRUD (create, read, update and delete) application

## [jayyfakorede.herokuapp.com](https://jayyfakorede.herokuapp.com/)

## this is a basic login credentials

### email = dfako

### password = password

Images are very important on our websites, and gives life to the internet. A website without at least one or two images will be very close to boring.
Images like content can be uploaded too a database for easy access, and today I am going to show you how to easily upload images to mongoDB via nodeJS.
Today I will explain how to
i. Upload images to mongodb
ii. Get the list of image object (in an array)
iii. Get a single image object
iv. Display the actual image.

Before we move forward, we are definitely going to need some packages from NPM (Node Package Manager), such has

1. Express : basically a Node.js web application framework
2. Mongoose : Object Data Modeling (ODM) library for MongoDB and Node.js. It basically handles relationship between data
3. Multer : Is used for uploading files
4. Gridfs-stream : Allows streaming of files to and from mongodb
   5 Gridfs : This is a specification for storing and retriviing files that excess the BSON-document size limit of 16MB

```
npm i express mongoose multer multer-gridfs-storage gridfs-stream
```

We will be uploadng straight to mongodb atlas, which is a remote mongoDB database, you can also use the local instance but the connection string will be different.

The first thing is to import the required modules, and some core nodeJS modules

```
const express = require('express')
const path = require('path')
const crypto = require('crypto')//to generate file name
const mongoose = require('mongoose')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const app = express()
```

Next is to add the connection string. If you are using the local instance , yours will probably be 27017

```
const mongoURI = "mongodb+srv://fako:fako@nodejspassport-nahp0.mongodb.net"
```

yours will probably be different.
Next thing is to initialize a variable for stream and once the connection is open, set the gfs variable to Grid(gridfs-stream) and then pass the collection where our images will be stored to gfs. Note that this collection will be divided into two, imageUpload.chunk and imageUpload.files

```
let gfs
conn.once('open', () => {
    //initialize our stream
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('imageUpload')
})

```

Now, we are going to create a storage object with a given configuration.
The first property will be the uri string which we specified above and the second is called **file**, a function to control the file storage in the database. It is invoked per file with the parameters req and file in that order and returns an object of a promise that resolves to an object. Some of the property of the object include
filename : The desired filename for the file (default: 16 byte hex name without extension), but you can override this with your given name
content-type : The content type for the file (default: inferred from the request)
bucketname : The GridFs collection to store the file (default: fs)
missing property will use the default

```
let storage = new GridFsStorage({
    url: uri,
    file: (req, file) => {
        return new Promise(
            (resolve, reject) => {
                console.log(file)


                const fileInfo = {
                    filename: file.originalname,
                    bucketName: "imageUpload"
                }
                resolve(fileInfo)

            }
        )
    }
})
```

Set the multer storage engine to the newly created object, we will use this upload variable has our middleware, so that it actually upload to the database

```
const upload = multer({ storage })
```

Now to actually upload an image,
