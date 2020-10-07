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
    gfs.collection("jayyImage")
    console.log("image connected")
})
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