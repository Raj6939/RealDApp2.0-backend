const userModel = require('../models/userSchema');
const {propertyModel,newpropertyModel} = require('../models/propertySchema');
const Web3 = require('web3');
const web3 = new Web3("https://rinkeby.infura.io/v3/5503310e5d284cb1bbcd784f05369a0e")
const createUser = async(req,res) => {
    console.log(req.body)
    const metamask_address= req.body.metamask_address;
    const name=req.body.name;
    const email=req.body.email;
    const mobile = req.body.mobile;
    const adharcardNo = req.body.adharcardNo;
    const signUpsignature = req.body.signUpsignature

    const checkData = await userModel.find( { $or: [ { metamask_address:metamask_address }, { adharcardNo:adharcardNo } ] } );
    console.log(checkData);
    if(checkData==null || checkData.length==0){

        const user = new userModel({
            metamask_address,
            name,
            mobile,
            email,
            adharcardNo,
            signUpsignature
        });
    
        user.save()
            .then((result) => {
                console.log(result);
                res.send(result);
            })
            .catch((err) => {
                console.log(err);
                res.send(false);
            })
    }else {
        res.send(false)
    }

    
    
};

const approve_user = async(req,res) => {
    const id = req.params.id; 
    if(req.body.obj.approved==true){
        const data = await userModel.findOne({metamask_address:id}); //finding approved user details
        const check = await propertyModel.find({adharNo:data.adharcardNo})
        console.log(check)
        await userModel.updateOne({metamask_address:id},{$set: {approved:true}}); //approving user by moderator
        if(check.length>0){
        await propertyModel.updateMany({adharNo : data.adharcardNo},{$set: {metamask_address:id}}); //adding metamask address to that respective user properties
        res.sendStatus(200);
        }
        else{
            res.send("User is Approved But properties Not Found");
        }

    }else{
        res.send("Not approved")
    }
    
}

const unapproved_users = async(req,res) => {
    const data = await userModel.find({approved:false});
    res.send(data);
}

const getProperties = async(req,res) => {
    const id = req.params.id;
    const data = await propertyModel.find({metamask_address:id});
    res.send(data);
}

const deployedProperties = async(req,res) => {
    const id = req.params.id;
    const data = await newpropertyModel.find({metamask_address:id});
    res.send(data);
}

const verifySign= async(req,res) => {
    const adharcardNo = req.body.msg;
    const signature = req.body.signature_data;
    const userData = await userModel.findOne({adharcardNo:adharcardNo});
    if(userData==null || !userData){
        res.send(false)
    }else{
        if(userData.signUpsignature == signature){
            res.send(userData);
        }else {
            res.send(false);
        }
    }
    
    
}

module.exports = {
    createUser,
    getProperties,
    approve_user,
    verifySign,
    unapproved_users,
    deployedProperties
};