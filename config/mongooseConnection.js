const mongoose = require('mongoose'); 

mongoose.connect(process.env.DB_URL + process.env.DB_NAME, {useUnifiedTopology: true, useNewUrlParser: true}); 

const db = mongoose.connection; 

db.once('open', () => {
    console.log("Database Successfully Connected!"); 
})
db.on('error', (err) => {
    console.log("Error while connecting to database."); 
})

module.exports = db; 