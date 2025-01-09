const authMiddleware=(req,res,next)=>{
    const {username,password}=req.body;

    if(username === 'akansha' && password ==='akansha1234'){
        next();
    }
    else{
        res.send("Wrong credentials")
    }
}

module.exports = authMiddleware;