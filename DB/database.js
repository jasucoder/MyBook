const mongoose = require('mongoose');




mongoose.connect('mongodb://127.0.0.1:27017/kitab', {useNewUrlParser : true})
//"mongodb+srv://jaswant:IndianArmy@cluster0.o7nswpm.mongodb.net/ll?retryWrites=true&w=majority"
const db = mongoose.connection
db.once('open',()=>{console.log("jaswant server is succesfully connected with mongoDB 3")})

db.on('error',()=>{console.log("jaswant server is Not connected with database")})

module.exports = db 