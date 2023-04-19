const mongoose = require('mongoose')

const commentschema = new mongoose.Schema({
    comment: {
        type: String,
        require: true
    }
},
    {
        versionKey: false
    })


const Comment = mongoose.model('Comment', commentschema);

module.exports = Comment