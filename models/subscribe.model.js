const mongoose = require('mongoose')
const Schema = mongoose.Schema
const subscribeSchema = new Schema({
    email: { type: String, required: true },
}, { timestamps: true })
const Subscribe = mongoose.model('Subscribe', subscribeSchema)
module.exports = Subscribe