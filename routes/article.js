const router = require('express').Router()
const jwt = require("jsonwebtoken")
let Article = require('../models/article.model')
// let ArticleCategory = require('../models/articleCategory.model')

//show all the article in that category
router.route('/articles/:categoryID').get((req, res) => {
    // Article.findById(req.params.id)
    Article.find().where('categoryId').in([req.params.categoryID]).exec((err, records) => {
        if (records) {
            res.json(records)
        } else {
            res.status(400).json(`Error: ${err}`)
        }
    })
})
//add an article
router.post('/add', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.json({ message: "expired token" })
        } else {
            const { name, draft, shortDescription, content, time, date, categoryName, categoryId, previewImage, author } = req.body
            const newArticle = new Article({
                name,
                draft,
                content,
                date,
                time,
                author,
                categoryName,
                categoryId,
                shortDescription,
                previewImage
            })
            newArticle.save()
                .then(() => res.json("article added"))
                .catch(err => res.status(400).json(`Error: ${err}`))
        }
    })

})

// get a single article
router.route('/:id').get((req, res) => {
    Article.findById(req.params.id)
        .then(article => res.json(article))
        .catch(err => res.status(400).json('Error: ' + err))
})

//delete an article
router.delete('/:id', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.json({ message: "expired token" })
        } else {
            Article.findByIdAndDelete(req.params.id)
                .then(() => res.json("Article Deleted"))
                .catch(err => res.status(400).json(`Error: ${err}`))
        }
    })

})


//update an article
router.post('/update/:id', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            console.log("expired token")
            res.json({ message: "expired token" })
        } else {
            Article.findById(req.params.id)
                .then(article => {
                    article.name = req.body.name
                    article.draft = req.body.draft
                    article.content = req.body.content
                    article.date = req.body.date
                    article.time = req.body.time
                    article.author = req.body.author
                    article.categoryName = req.body.categoryName
                    article.categoryId = req.body.categoryId
                    article.shortDescription = req.body.shortDescription
                    article.previewImage = req.body.previewImage
                    article.save()
                        .then(() => {

                            res.json("article Updated")
                        })
                        .catch(err => res.status(400).json(`Error: ${err}`))
                })
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