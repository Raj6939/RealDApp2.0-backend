const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transferPropertySchema = new Schema({
    buyer_metamask_address:{
        type:String,
        required:true
    },
    seller_metamask_address:{
        type:String,
        required:true
    },
    buyer_email:{
        type:String,
        required:true
    },
    seller_email:{
        type:String,
        required:true
    },
    prop_id:{
        type:Number,
        required:true
    }
    
},{timestamps: true});

const transferPropertyModel = mongoose.model('notification',transferPropertySchema);

module.exports = transferPropertyModel;