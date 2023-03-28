const express = require('express');
const router = express.Router();
const { Comments } = require('../models');
const{validateToken} = require('../middlewares/AuthMiddle')
//get specific comments
router.get('/comment/:postId', async(req,res)=>{
    const postId = req.params.postId;
    const comments = await Comments.findAll({
        where: {
            PostId: postId,
        }
    })
    res.json(comments)
})

//post comment
router.post('/',validateToken, async(req,res)=>{
    try{
        const comment = req.body;
        const username = req.user.username;
        comment.username=username;
        await Comments.create(comment)
        res.json(comment)
    }
    catch(error){
        res.json(error)
    }
})

//delete comment
router.delete('/:id', validateToken, (req,res) => {
    const commentId = req.params.id;
    Comments.destroy({
        where:{
            id:commentId
        }
    });
    res.json('Comment Deleted');
})
module.exports = router;