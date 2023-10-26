const mongoose = require("mongoose");
var mongoURL = 'mongodb+srv://mahlatse:MkenosiS95@cluster0.zhie8wg.mongodb.net/TheDeck'
mongoose.connect(mongoURL, {useUnifiedTopology: true, useNewUrlParser: true})
var connection = mongoose.connection
connection.on('error', ()=>{
    console.log('Mongo DB Connection failed')
})
connection.on('connected', ()=>{
    console.log('Mongo DB Connection Successful')
})
module.exports = mongoose