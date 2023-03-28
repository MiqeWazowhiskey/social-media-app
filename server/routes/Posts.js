const express = require('express');
const { validateToken } = require('../middlewares/AuthMiddle');
const router = express.Router();
const { Posts } = require('../models')

router.get("/", async ( req, res )=>{
    try{
        const listPosts = await Posts.findAll()
        res.json(listPosts)
    }
    catch(error){
        console.log(error)
    }
})

router.get("/id/:id", async (req,res)=>{
    try{
        const id = req.params.id
        const post = await Posts.findByPk(id)
        res.json(post)
    }
    catch(error){
        console.log(error)
    }
})

router.post("/",validateToken, async ( req, res )=>{
    const post = req.body
    post.username = req.user.username
    try{
        await Posts.create(post)
        res.json(post)
    }
    catch(error){
        console.log(error)
    }
})

//delete
router.delete('/:id', validateToken, async(req,res)=>{
    const postId = req.params.id;
    Posts.destroy({
        where:{
            id:postId
        }
    })
    res.json('Post deleted')
})

module.exports = router;
