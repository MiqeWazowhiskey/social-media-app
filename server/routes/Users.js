const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const {Users} = require('../models')


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
            res.json({errors:'Wrong username password combination'});
        }
        else {
            res.json('Logged in')
        }
    })
})

module.exports = router ;