const express = require('express');
const { validateToken } = require('../middlewares/AuthMiddle');
const router = express.Router();
const { Posts } = require('../models')

//get all posts
router.get("/", async ( req, res )=>{
    try{
        const listPosts = await Posts.findAll()
        res.json(listPosts)
    }
    catch(error){
        console.log(error)
    }
})

//get 1 post by ID
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

//post post
router.post("/",validateToken, async ( req, res )=>{
    const post = req.body
    post.username = req.user.username
    try{
        await Posts.create(post)
        res.json(post)
    }
    catch(error){
        alert(error)
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

//get user's posts
router.get('/profile/:id', validateToken, async (req, res)=>{
    const id = req.params.id
    const data = await Posts.findAll({where:{UserId:id}})
    if(!data) res.json('Profile not found')
    else{
        res.json(data)
    }
    
})

module.exports = router;
