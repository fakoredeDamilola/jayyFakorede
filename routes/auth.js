const router = require('express').Router()
const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
//add a user
router.route('/add').post((req, res) => {
    const { email, name, password } = req.body
    const newUser = new User({ name, email, password })
    newUser.save()
        .then(() => res.json("user added"))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route('/login').post((req, res) => {
    res.cookie("myFirstCookie2266", "looks Good")
    const { email, password } = req.body
    res.cookie('username', 'Flavio', { expires: new Date(Date.now() + 900000), httpOnly: true })
    const cookieConfig = {
        httpOnly: true, // to disable accessing cookie via client side js
        //secure: true, // to force https (if you use it)
        maxAge: 1000000000, // ttl in ms (remove this option and cookie will die when browser is closed)
        // signed: true // if you use the secret with cookieParser
    };
    //res.cookie('JWt', 'token', cookieConfig)
    res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true })
    res.end("you are")
    console.log(res.cookie)
    User.find().where('email').in([email]).exec((err, records) => {
        if (records) {
            let info = records.filter(rec => rec.email === email && rec.password === password)
            // , 
            if (info.length !== 0) {
                // res.json(info)

                jwt.sign({ user: info[0] }, 'secretkey', { expiresIn: '24h' }, (err, token) => {

                    res.json({ token })

                })
            } else {
                res.json({ message: "you have to create a account" })
            }
        } else {
            res.status(400).json(`Error: ${err}`)
        }
    })
})
router.post('/post', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            // res.sendStatus(403)
            res.json({ message: "wrong token" })
        } else {
            res.json({
                message: "Post created",
                authData
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