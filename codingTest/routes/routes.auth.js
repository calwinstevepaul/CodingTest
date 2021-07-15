const express = require('express');
var router = express.Router();
const {login} = require("../controller/controller.auth")

router.post('/login',async(req,res)=>{
    try {
        let loginRes = await login(req) 
        if(!loginRes.status) throw loginRes      
        
        res.status(200).send(loginRes.data)
        
    } catch (error) {
        console.log("error in Post login router",error)
        
        if(!error.status && error.error){
            return res.status(error.errorcode).send(error.error)
        }
        return res.status(500).send("server error")
    }
})

module.exports = router