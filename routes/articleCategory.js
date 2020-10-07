const router = require('express').Router()
let ArticleCategory = require('../models/articleCategory.model')
const jwt = require("jsonwebtoken")
//get all categories
router.get('/', (req, res) => {

    ArticleCategory.find()
        .then(category => res.json(category))
        .catch(err => res.status(400).json(`Error: ${err}`))


})

//get a particular category
router.get('/category/:categoryID', (req, res) => {

    ArticleCategory.find().where('_id').in([req.params.categoryID]).exec((err, records) => {
        if (records) {
            res.json(records)
        } else {
            res.status(400).json(`Error: ${err}`)
        }
    })


})

//add a category
router.post('/add', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.json({ message: "expired token" })
        } else {
            const { name, number, previewImage, aos, publish } = req.body;
            const newArticleCategory = new ArticleCategory({ name, number, previewImage, aos, publish })
            newArticleCategory.save()
                .then(() => res.json('Category added'))
                .catch(err => res.status(400).json(`Error: ${err}`))
        }
    })

})

//delete a category
router.delete('/:id', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.json({ message: "expired token" })
        } else {
            ArticleCategory.findByIdAndDelete(req.params.id)
                .then(() => { res.json('Category deleted') })
                .catch(err => res.status(400).json(`Error: ${err}`))
        }
    })

})

//add number of category
router.post("/addNumber/:id", verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.json({ message: "expired token" })
        } else {
            console.log(req.body.number)
            ArticleCategory.findById(req.params.id)
                .then(category => {
                    category.number = req.body.number
                    category.save()
                        .then(() => res.json("category updated"))
                        .catch(err => res.status(400).json('Error: ' + err))
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