const Post = require('../models/post')
const fs = require('node:fs/promises')
const path = require('node:path')
const { basepath } = require('../config/index')

const allpost = async (req, res) => {
    try {
        const allpost = await Post.find()

        res.render('profile', { posts: allpost })
    } catch (error) {
        res.json({
            status : 400,
            message : ' post is not Found '
        })
    }
}

const allposts = async (req, res) => {
    try {
        const allpost = await Post.find()

        res.send(allpost)
    } catch (error) {
        res.json({
            status : 400,
            message : ' post is not Found '
        })
    }
}
const createpost = async (req, res) => {
    try {
        const upload = new Post({
            title: req.body.title,
            caption: req.body.caption,
            profile: req.file.filename
        })
        const send = await upload.save()
        res.json({
            status: 200,
            message: " uploaded successful",
            data: send
        })
    } catch (error) {
        res.json({
            status : 400,
            message : ' post is not created '
        })
    }
}

const updatepost = async (req, res) => {
    try {
        const id = req.params.id
        const title = req.body.title
        const caption = req.body.caption
        const profile = req.file.filename
        const updatedpost = await Post.findByIdAndUpdate({ _id: id }, { $set: { title, caption, profile } });
        const imagepath = path.join(basepath, 'imagegallery', updatedpost.profile)
        await fs.rm(imagepath)
        
        if(!updatedpost){
            res.json({
                status : 404,
                message : "Post Not found"
            })
        }
        res.json({
            status : 200,
            message : "Update Successfully"
        })

    } catch (error) {
        res.json({
            status : 400,
            message : ' post is not Updated '
        })
    }
}
const deletepost = async (req, res) => {
    try {
        const id = req.params.id
        const deletepost = await Post.findByIdAndDelete({ _id: id })
        const imagepath = path.join(basepath, 'imagegallery', deletepost.profile)
        await fs.rm(imagepath)
        // res.send('deleted')
        if(!deletepost){
            res.json({
                status : 404,
                message : "Post Not found"
            })
        }
        res.json({
            status : 200,
            message : "Delete Successfully"
        })
    } catch (error) {
        res.json({
            status : 400,
            message : ' post is not Deleted '
        })
    }
}
module.exports = { createpost, allpost, deletepost, allposts, updatepost }
