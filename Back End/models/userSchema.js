const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    metamask_address:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
    // address:{
    //     type:String,
    //     required:true
    // },
    // adharcardNo:{
    //     type:String,
    //     required:true
    // },
    // pancardNo:{
    //     type:String,
    //     required:true
    // },
    // adhar_hash:{
    //     type:String,
    //     required:true
    // },
    // pan_hash:{
    //     type:String,
    //     required:true
    // }
},{timestamps: true});

const userModel = mongoose.model('users',userSchema);

module.exports = userModel;