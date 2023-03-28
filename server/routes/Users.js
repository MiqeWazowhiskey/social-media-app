const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const {Users} = require('../models')
const { v4: uuidv4 } = require('uuid');
const{sign} = require('jsonwebtoken');
const { validateToken } = require('../middlewares/AuthMiddle');

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

//get current auth
router.get('/getAuth',validateToken, (req,res)=> {
    res.json(req.user)
})

//get by Id
router.get('/byId/:id', async (req, res) => {
    const userId = req.params.id;
    const userInfo = await Users.findByPk(userId,{attributes:{
        exclude: ['password']
    }})
    if(!userInfo){
        res.json({error:'User not found...'});
    }
    else{
        res.json(userInfo)
    }
})

module.exports = router ;