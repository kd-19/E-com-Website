const jwt = require('jsonwebtoken');
const config = require('../config');

function verifyToken(req, res, next){
    const token = req.headers['authorization'];

    if(!token){
        return res.status(401).json({ message: 'Unauthorized: No token provided'});
    }

    jwt.verify(token, config.jwtSecret, (err,tokenData)=>{
        if(err){
         return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        else{
            res.json(tokenData);
        }
        req.user=tokenData;
        next();
    });  
}

module.exports= {
    verifyToken
};