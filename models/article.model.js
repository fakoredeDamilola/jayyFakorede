const mongoose = require('mongoose')
const Schema = mongoose.Schema
const articleSchema = new Schema({
    name: { type: String, required: true },
    draft: { type: Boolean, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    categoryName: { type: String, required: true },
    slug: { type: String, required: true },
    categoryId: { type: String, required: true },
    shortDescription: { type: String, required: true },
    markdown: { type: String },
    previewImage: { type: String, required: true }
}, { timestamps: true })
const Article = mongoose.model('Article', articleSchema)
module.exports = Article