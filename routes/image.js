const router = require("express").Router()
const mongoose = require("mongoose")
const path = require("path")
const multer = require("multer")
const GridFsStorage = require("multer-gridfs-storage")
const Grid = require("gridfs-stream")
const jwt = require("jsonwebtoken")
const uri = process.env.ATLAS_URI
let gfs;
const connection = mongoose.connection
connection.once('open', () => {

    gfs = Grid(connection.db, mongoose.mongo)
    //specify the collection our image will be going into. Note that this will be divided into two, upload.chunk and unpload.files
    gfs.collection("jayyImage")
    console.log("image connected")
})
// Create a storage object with a given configuration
// file : A function to control the file storage in the database. Is invoked per file with the parameters req and file, in that order. The return value of this function is an object, or a promise that resolves to an object
// the object contains a few property such has
//filename : The desired filename for the file (default: 16 byte hex name without extension), but you can override this with your given name
//content-type : The content type for the file (default: inferred from the request)
//bucketname : The GridFs collection to store the file (default: fs)
//chunkSize : 	The size of file chunks in bytes (default: 261120)
//mising property will use the default
let storage = new GridFsStorage({
    url: uri,
    file: (req, file) => {
        return new Promise(
            (resolve, reject) => {
                console.log(file)


                const fileInfo = {
                    filename: file.originalname,
                    bucketName: "jayyImage"
                }
                console.log(fileInfo)
                resolve(fileInfo)

            }
        )
    }
})

// Set multer storage engine to the newly created object, we will use this upload variable has our middleware, so that it actually upload to the database
const upload = multer({ storage })
router.get("/", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.json({ message: "expired token" })
        } else {
            gfs.files.find().toArray((err, files) => {
                //check if files  exist
                if (!files || files.length == 0) {
                    res.json("no file found")
                } else {
                    files.map(file => {
                        if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
                            file.isImage = true
                        } else {
                            file.isImage = false
                        }

                    })

                    res.json(files)
                }
            })
        }
    })

})
//post  files
//add the name of the file field to multer
//when uplading files, between the route and arrow function, we need to add the middleware upload and call a .single (because we are uploading a single file. you can upload multiple file has an array) and you will pass the name you are using in your input file(i.e in the frontend e.g <input type="file" name="file"/>)
router.post("/upload", verifyToken, upload.single('file'), (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.json({ message: "expired token" })
        } else {
            console.log("uploaded")
            res.json({ message: "uploaded" })
        }
    })

})

// get files
//you can use gridfsstream like you will use moongose
router.get("/files", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.json({ message: "expired token" })
        } else {
            gfs.files.find().toArray(
                (err, files) => {
                    if (!files || files.length == 0) {
                        return res.status(404).json({
                            err: "No files exist"
                        })
                    }
                    // files exist
                    return res.json(files)
                }
            )
        }
    })

})

//get single image
router.get('/file/:filename', (req, res) => {

    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        //check if files exist
        if (!file || file.length == 0) {
            return res.status(404).json({
                err: "No files exist"
            })
        }

        //check if image
        if (file.contentType === "image/jpeg" || file.contentType === "img/png" || file.contentType === "image/png" || file.contentType === "image/svg+xml") {
            //read output to browser
            const readStream = gfs.createReadStream(file.filename)
            readStream.pipe(res)
        } else {
            res.status(404).json({
                err: "Not an image"
            })
        }
    })


})
//delete file
router.delete("/file/:id", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.json({ message: "expired token" })
        } else {
            gfs.remove({ _id: req.params.id, root: "jayyImage" }, (err, gridStore) => {
                if (err) {
                    return res.status(404).json({ err: err })
                }
                res.redirect("/")
            })
        }
    })

})

//verify token
function verifyToken(req, res, next) {
    //get auth header value
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== "undefined") {
        //split at the space
        const bearer = bearerHeader.split(' ')[1]


        req.token = bearer
        next()
    } else {
        res.sendStatus(403)
    }
}
module.exports = router