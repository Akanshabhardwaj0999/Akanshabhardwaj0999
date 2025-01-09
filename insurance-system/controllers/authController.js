const authMiddleware = require('../middlewares/authMiddleware')
require('dotenv').config();
const JWT = require('jsonwebtoken')
const authToken=(req,res)=>{
    const data= req.body;

    const token= JWT.sign(data,process.env.JWT_secret_key);
    res.json(token);
}

module.exports = authToken;