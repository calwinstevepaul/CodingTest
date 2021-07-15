const mongoose = require('mongoose');
const { Auth } = require('../models/models.auth');
const bcrypt =require('bcrypt')
var jwt = require("jsonwebtoken");



module.exports.login = async(req)=>{
    try {
        //username:Batmen;
        //password:iambatman;
        
        const getUser = await Auth.findOne({username:req.body.userName})
        if(!getUser) throw({status:false, error:"No Such User", errorcode:400})
        
        const passwordMatched = await bcrypt.compare(req.body.password, getUser.password);

        if (passwordMatched) {
            var token = jwt.sign({ id: getUser._id}, "calwin123", { expiresIn: "1h" } );
            return ({status:true, data:{name: getUser.name, id:getUser._id,token: token,message: "login successful"}, errorcode:null})
        }
            
        return ({status:false, error:"Wrong Password", errorcode:400})
        
    } catch (error) {
        console.log("error in login controller",error);

        if(!error.status && error.error){
            return {status:false, error:error.error, errorcode:error.errorcode}
        }
        return{status:false, error:"server error", errorcode:500}
    }

}