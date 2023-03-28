const express = require('express');
const router = express.Router();
const { Comments } = require('../models');

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
router.post('/', async(req,res)=>{
    try{
        const comment = req.body;
        await Comments.create(comment)
        res.json(comment)
    }
    catch(error){
        console.log(error)
    }
})

module.exports = router;