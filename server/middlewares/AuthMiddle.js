const { verify } = require('jsonwebtoken');

const validateToken = ( req, res, next) => {
    const accessToken = req.header('accessToken');
    if(!accessToken){
        res.json({error: 'You should logged in...'});
    }
    try{
        const validToken = verify(accessToken,'secret')
        if(validToken){
            return next();
        }
    }
    catch(error){
        res.json({error:error});
    }
}

module.exports = {validateToken} ;