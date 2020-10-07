const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const app = express()
// "nodemonConfig": {
//     "restartable": "rs",
//     "ignore": [
//       "node_modules/**/node_modules"
//     ],
//     "delay": "2500",
//     "env": {
//       "NODE_ENV": "development",
//       "PORT": 4000
//     }
//   },
const port = process.env.PORT || 4000
app.use(cors())
app.use(express.json())
const uri = process.env.ATLAS_URI
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection
// init variable for stream
//let gfs;
connection.once('open', () => {
    console.log("mongoDB database connected")
    // gfs = Grid(connection.db, mongoose.mongo)
    // gfs.collection("jayyImage")
})


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