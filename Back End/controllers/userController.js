const propertyModel = require('../models/propertySchema.js');
const userModel = require('../models/userSchema.js');

const userDetail = (req,res) => {
    
    console.log(req.body);
    const name=req.body.name;
    const metaAddress=req.body.metaAddress;
    const email=req.body.email;
  

    
    const user = new userModel({
         'name':name,
         'metaAddress':metaAddress,
         'email':email
    });

    user.save()
        .then((result) => {
            console.log(result);
            // res.redirect('/dashboard');
        })
        .catch((err) => {
            console.log(err);
        })
    res.send("Hello World Post");
};

const getuser = async(req,res) => {
    const {id} =req.params
    console.log(id)
    const data = await userModel.findOne({metaAddress:id});
    const property = await propertyModel.find({metaAddress:id})
    
    console.log(data);
    // if(property.length>0 && property){
    //     let i;
    //     for(i=0;i<=property.length;i++){
    //         const prop=data.pu
    //     }
    // }
    const temp ={...data['_doc'],properties:property}
    console.log(temp)
    // const temp = {...data}
    // data.push({propeties:property})
    // temp.push({propties:property})
    // temp.push({...data,properties:property})
    // data.properties = [];
    // data.properties.push(property)
    // console.log(temp)
    
    // const propData = temp
    res.send(temp);
}

const getAllusers = async(req,res) => {
  
    const data = await userModel.find();

    res.send(data);
}
module.exports = {
    userDetail,
    getuser,
    getAllusers
};