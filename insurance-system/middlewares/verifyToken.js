const JWT = require("jsonwebtoken");

require('dotenv').config();

const verifyToken=(req,res,next)=>{
    const tokenHeader = req.headers['authorization'];
    if(!tokenHeader){
        res.send("no token found");

    }
    else{
        const token= tokenHeader.split(" ")[1];
        const decoded= JWT.verify(token,process.env.JWT_secret_key );
        next();
    }
}

module.exports = verifyToken