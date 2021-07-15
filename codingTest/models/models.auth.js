const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongooseAuth = new Schema({
    name:String,
    username:String,
    password:String
});


const Auth = mongoose.model("Auth", mongooseAuth);

module.exports.Auth = Auth;