const mongoose = require('mongoose')
const Schema = mongoose.Schema
const articleCategorySchema = new Schema({
    name: { type: String, required: true },
    number: { type: Number, required: true },
    previewImage: { type: String, required: true },
    aos: { type: String, required: true },
    publish: { type: Boolean, required: true }
}, { timestamps: true })
const ArticleCategory = mongoose.model('ArticleCategory', articleCategorySchema)
module.exports = ArticleCategory