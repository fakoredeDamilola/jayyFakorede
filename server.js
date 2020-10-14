const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser')

require("dotenv").config()
const app = express()

const port = process.env.PORT || 4000
app.use(cors())
app.use(express.json())
app.use(cookieParser())
const uri = process.env.ATLAS_URI
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


//cookie
app.get("/cookie", function (req, res) {
    res.cookie("myFirstCookie", "looks Good")
    res.send("wow")
})

const connection = mongoose.connection
// init variable for stream
//let gfs;
connection.once('open', () => {
    console.log("mongoDB database connected")
    // gfs = Grid(connection.db, mongoose.mongo)
    // gfs.collection("jayyImage")
})

//set headers in node


const articleCategory = require("./routes/articleCategory")
const article = require("./routes/article")
const image = require("./routes/image")
const auth = require("./routes/auth")
const subscribe = require("./routes/subscribe")
app.use('/api/articlecategory', articleCategory)
app.use('/api/article', article)
app.use('/api/auth', auth)
app.use('/api/image', image)
app.use('/api/subscribe', subscribe)
// "engines": {
//     "node": "12.18"
//   },
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "client/build"))
    })
}


app.listen(port, () => console.log("listening at port " + port));