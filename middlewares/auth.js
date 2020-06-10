module.exports.checkAuthentication = (req, res, next) => {
    if(req.isAuthenticated()){
        next(); 
    }else{
        res.redirect('/'); 
    }
}
module.exports.setUser = (req, res, next) => {
    if(req.isAuthenticated()){
        res.locals.user = req.user; 
    }
    next(); 
}