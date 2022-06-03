const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema({
    prop_id:{
        type:Number,
        required:false
    },
    prop_area:{
        type:String,
        required:true
    },
    prop_house_no:{
        type:Number,
        required:true
    },
    prop_landmark:{
        type:String,
        required:true
    },
    prop_city:{
        type:String,
        required:true
    },
    prop_state:{
        type:String,
        required:true
    },
    prop_price:{
        type:Number,
        required:false
    },
    prop_document:{
        type:String,
        required:true
    },
    prop_surveyNumber:{
        type:String,
        required:true
    },
    metamask_address:{
        type:String,
        required:false
    },
    adharNo:{
        type:String,
        required:true
    },
    deployed: {
        type:Boolean,
        required:true
    },
    tranasaction_hash: {
        type:String,
        required:false
    }
},{timestamps: true});

propertySchema.path('adharNo').validate(function(code) {
    return code.length === 12;
  }, 'Adhar Card Number Must Be 12 Digits');

const propertyModel = mongoose.model('ExistingDB',propertySchema);
const newpropertyModel = mongoose.model('Nfts',propertySchema);

module.exports = {propertyModel,newpropertyModel};