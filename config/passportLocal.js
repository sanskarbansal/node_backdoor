const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {
    try{
        let user = await User.findOne({$and: [{username: username},{password: password}]}); 
        if(user){
            done(null, user); 
        }else{
            done(null, false); 
        }
    }catch(err){
        done(err); 
    }
})); 

passport.serializeUser((user, done) => {
    done(null, user.id); 
})
passport.deserializeUser(async (id, done) => {
    try{
        let user = await User.findById(id);
        if(user) done(null, user); 
        else done(null, false);  
    }catch(err){
        done(err); 
    }
})
