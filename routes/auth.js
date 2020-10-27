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
let createKey = "jayyFakorede@data.create.com"
router.route('/login').post((req, res) => {
    const { email, password } = req.body

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
router.post('/create/user', (req, res) => {
    const { email, password, secretInfo } = req.body
    console.log(req.body)
    if (secretInfo === createKey) {
        const newUser = new User({ email, password })
        newUser.save()
            .then(() => res.json('user added'))
            .catch(err => res.status(400).json(`Error:${err}`))
    } else {
        console.log("secret key is wrong")
        res.json("secret key is wrong")
    }

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