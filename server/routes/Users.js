const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const {Users} = require('../models')
const { v4: uuidv4 } = require('uuid');
const{sign} = require('jsonwebtoken')

//post hashed password register
router.post('/', async(req,res)=>{
    const { username, password } = req.body ;
    bcrypt.hash(password,10).then((hashed) => {
        Users.create({
            username: username,
            password: hashed
        })
        res.json('Registered')
    });
})
//login
router.post('/login', async(req,res) => {
    const { username , password } = req.body ;
    const user = await Users.findOne({where:{username:username}});
    if(!user){
        res.json({error:'User not found...'});
    }
    bcrypt.compare(password, user.password).then((matched)=>{
        if(!matched){
            res.json({error:'Wrong username password combination'});
        }
        else {
            //create access token
            const token = sign({username:user.username, id: user.id}, 'secret')
            res.json(token)
        }
    })
})

module.exports = router ;