const mongoose = require("mongoose");
var mongoURL = 'mongodb+srv://Keno:MkenosiS95@newcluster06.t5dwjhj.mongodb.net/Mern'
mongoose.connect(mongoURL, {useUnifiedTopology: true, useNewUrlParser: true})
var connection = mongoose.connection
connection.on('error', ()=>{
    console.log('Mongo DB Connection failed')
})
connection.on('connected', ()=>{
    console.log('Mongo DB Connection Successful')
})
module.exports = mongoose