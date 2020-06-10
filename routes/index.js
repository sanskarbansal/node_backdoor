const router = require('express').Router();
const passport = require('passport'); 
const { signup } = require('../controller/signup');
const {checkAuthentication, setUser} = require('../middlewares/auth'); 

router.get('/dashboard',[checkAuthentication, setUser], (req, res, next) => {
        res.render('dashboard'); 
})
router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/',
    })
);
router.use('/cp', require('./cp')); 
router.post('/signup', signup);
router.get('/', (req, res) => {
    res.render('index'); 
})
module.exports = router; 