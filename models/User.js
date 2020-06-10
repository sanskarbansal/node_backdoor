const mongoose = require('mongoose'); 

const UserSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true, 
    }, 
    email: {
        type: String, 
        required: true
    }, 
    phone_no: Number, 
    password: {
        type: String, 
        required: true
    }, 
    name: {
        type: String,
        required: true
    }
}); 

module.exports = mongoose.model('User', UserSchema); 