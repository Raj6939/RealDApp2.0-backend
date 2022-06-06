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
        required:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    adharcardNo:{
        type:String,
        required:true
    },
    approved:{
        type:Boolean,
        default:false
    },
    signUpsignature:{
        type:String,
        required:true
    },
},{timestamps: true});

userSchema.path('adharcardNo').validate(function(code) {
    return code.length === 12;
  }, 'Adhar Card Number Must Be 12 Digits');

userSchema.path('mobile').validate(function(code) {
    return code.length === 10;
  }, 'Mobile Number Must Be 10 Digits');


const userModel = mongoose.model('users',userSchema);

module.exports = userModel;