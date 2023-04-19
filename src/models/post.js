const mongoose = require('mongoose')

const postschema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    caption: {
        type: String,
        require: true
    },
    profile: {
        type: String,
    }
}, {
    versionKey: false
})


const Post = mongoose.model('Post', postschema);

module.exports = Post