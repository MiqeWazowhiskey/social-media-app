const express = require('express');
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

router.post("/", async ( req, res )=>{
    const post = req.body
    try{
        await Posts.create(post)
        res.json(post)
    }
    catch(error){
        console.log(error)
    }
})

module.exports = router;
