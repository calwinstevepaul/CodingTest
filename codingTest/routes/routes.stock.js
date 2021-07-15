const express = require('express');
var router = express.Router();
const {getNse} = require("../controller/controller.stock")


router.get('/nse',async(req,res)=>{
    try {
        let getNseRes = await getNse(req) 
        if(!getNseRes.status) throw getNseRes      
        
        res.status(200).send(getNseRes.data)
        
    } catch (error) {
        console.log("error in get getNSC router",error)
        
        if(!error.status && error.error){
            return res.status(error.errorcode).send(error.error)
        }
        return res.status(500).send("server error")
    }
})

module.exports = router


