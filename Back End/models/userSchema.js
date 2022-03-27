const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    metaAddress:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    // props:{
    //     type:Array,
    // }
})

const userModel = mongoose.model('user',userSchema);


module.exports = userModel;