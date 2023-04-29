const jwt = require("jsonwebtoken");
const User = require('../models/userSchema');

const authUser = async (req, res, next) =>{

    try {
        
        const token = req.cookies.jwtoken;
        console.log(token);
        const verifyToken = jwt.verify(token, process.env.ACCESS_TOKEN_KEY); 
        console.log(verifyToken);
     
        const rootUser = await User.findOne({_id: verifyToken._id});
        
        if(!rootUser){ throw new Error('User not found')};
        // console.log(token);
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id; 

        next(); 

    } catch (error) {
    
        res.status(401).send('Unautorized: No token provided')
        console.log(error);
    }
}

module.exports = authUser
