const mongoose = require('mongoose');
const { NSE } = require('../models/models.stock.nse');
const {} = require("../helper/helper.stock");

module.exports.getNse = async(req)=>{
    try {
       const {name, _id} = req.query;
       
       //* setting query based on input
       let queryString = {};
       let sorting = {_id: 1};
       
       if (name && name.length > 0) queryString =  { name: {$regex: new RegExp( name, 'mi')} } ;
       if (_id) queryString =  {_id} ;

       const getStocks = await NSE.find(queryString).sort(sorting).lean()

        return({status:true, data:getStocks, errorcode:null})

        
    } catch (error) {
        console.log("error in get Stocks controller",error);

        if(!error.status && error.error){
            return {status:false, error:error.error, errorcode:error.errorcode}
        }
        return{status:false, error:"server error", errorcode:500}
    }

}