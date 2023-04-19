const Comment = require('../models/comment')

const createComment = async(req,res)=>{
    const commenton = new Comment({
        comment : req.body.comment
    })
    const scomment = await commenton.save()
    res.json({
        status : 200,
        comment : scomment
    })
}

module.exports = {createComment}