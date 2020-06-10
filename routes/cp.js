const router = require('express').Router();
const fs = require('fs');
const path = require('path');
// const User = require(;)
const { checkAuthentication, setUser } = require('../middlewares/auth');

router.get('/:id', [checkAuthentication, setUser], (req, res) => {
    if (req.params.id === req.user.id) {

        let data = fs.readFileSync(path.join(__dirname, '../payload/index.py')).toString();

        for (let i = 0; i < 2; i++) data = data.replace('<%= user._id %>', req.user.id);

        fs.writeFileSync(path.join(__dirname, '../payload/temp.py'), data);
        
        res.download(path.join(__dirname, '../payload/temp.py'));
    } else {
        console.log(req.user.id);
    }

})
module.exports = router; 