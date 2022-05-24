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
    },
    adharcardNo:{
        type:String,
        required:true
    },
    approved:{
        type:Boolean,
        default:false
    }
},{timestamps: true});

const userModel = mongoose.model('users',userSchema);

module.exports = userModel;