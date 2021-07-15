
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongooseNSE = new Schema({
    name:String,
    currentMarketPrice: Number, 
    marketCap: Number,
    stockPE: Number,
    dividendYield: Number,
    roce: Number,
    roePreviousAnnum: Number,
    debtToEquity: Number,
    eps: Number,
    reserves: Number,
    debt: Number
});

mongooseNSE.index( { name: "text" } )

const NSE = mongoose.model("NSE", mongooseNSE);

module.exports.NSE = NSE;