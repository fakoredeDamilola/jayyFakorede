const router = require('express').Router()
const jwt = require("jsonwebtoken")
let Article = require('../models/article.model')
let showdown = require('showdown')
let converter = new showdown.Converter();
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


converter.setOption('simplifiedAutoLink', 'true');
router.post("/convert", function (req, res, next) {
    if (typeof req.body.content == 'undefined' || req.body.content == null) {
        res.json(["error", "No data found"]);
    } else {
        let text = req.body.content;
        let html = converter.makeHtml(text)
        res.json(["markdown", html])
    }
})
//add an article
router.post('/add', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.json({ message: "expired token" })
        } else {
            const { name, draft, shortDescription, content, date, categoryName, categoryId, previewImage, author } = req.body
            let text = content;
            let markdown = converter.makeHtml(text)
            let slug = name.split(" ").join("-")
            const newArticle = new Article({
                name,
                draft,
                slug,
                content,
                markdown,
                date,
                author,
                categoryName,
                categoryId,
                shortDescription,
                previewImage
            })
            newArticle.save()
                .then(() => res.json("article added"))
                .catch(err => {
                    console.log(err)
                    res.status(400).json(`Error: ${err}`)
                })
        }
    })

})

// get a single article
router.route('/:slug').get((req, res) => {
    // Article.findById(req.params.id)
    //     .then(article => res.json(article))
    //     .catch(err => res.status(400).json('Error: ' + err))
    console.log(req.params.slug)
    Article.find().where('slug').in([req.params.slug]).exec((err, records) => {
        if (records) {
            res.json(records)
        } else {
            res.status(400).json(`Error: ${err}`)
        }
    })
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
            let text = req.body.content;
            let markdown = converter.makeHtml(text)
            Article.findById(req.params.id)
                .then(article => {
                    article.name = req.body.name
                    article.draft = req.body.draft
                    article.content = req.body.content
                    article.markdown = markdown
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
// So, for example, we can set an option to automatically insert and link a specified URL without any markup.


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