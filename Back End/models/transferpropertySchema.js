const mongoose = require('mongoose');
const { schema } = require('./userSchema');
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
    buyer_name:{
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
    },
    approved_status:{
        type:Boolean,
        required:false,
        default:false
    }
    
},{timestamps: true});

const propertyApprovedStatus = new Schema({

    prop_id:{
        type:Number,
        required:true
    },
    approved_status:{
        type:Boolean,
        required:false,
        default:false
    }


},{timestamps: true});


const notification = mongoose.model('notification',propertyApprovedStatus);
const sellPropertyModel = mongoose.model('sell_notification',transferPropertySchema);
const buyPropertyModel = mongoose.model('buy_notification',transferPropertySchema);

module.exports = {
    sellPropertyModel,
    buyPropertyModel,
    notification
};