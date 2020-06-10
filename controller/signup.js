const User = require('../models/User'); 

module.exports.signup = async (req, res, next) => {
    try{
        let {username, name, email, password} = req.body; 
        console.log(req.body);  
        let user = await User.findOne({$or: [{username},{email}]}); 
        if(!user){
            let user = await User.create({username, name, email, password}); 
        }
        res.redirect('back'); 
    }catch(err){
        console.log('[SignUp Controller] Error while registering user.'); 
        res.redirect('back'); 
    }
}

