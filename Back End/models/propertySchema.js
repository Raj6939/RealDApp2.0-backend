const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema({
    // prop_id:{
    //     type:Number,
    //     required:true
    // },
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
        required:true
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
        required:true
    }
},{timestamps: true});

const propertyModel = mongoose.model('ExistingDB',propertySchema);

module.exports = propertyModel;