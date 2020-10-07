const router = require('express').Router()
const jwt = require("jsonwebtoken")
let Subscribe = require('../models/subscribe.model')

//show all the subcribers in that category
router.get('/', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.json({ message: "expired token" })
        } else {
            Subscribe.find()
                .then(subscribers => res.json(subscribers))
                .catch(err => res.status(400).json(`Error: ${err}`))
        }
    })

})

//add a subscriber
router.post('/add', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.json({ message: "expired token" })
        } else {
            const { email } = req.body;
            const subscriber = new Subscribe({ email })
            subscriber.save()
                .then(() => {
                    console.log("subscriber added")
                    res.json('Subscriber added')
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        }
    })
})

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