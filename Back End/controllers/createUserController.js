const userModel = require('../models/userSchema');
const propertyModel = require('../models/propertySchema');
const Web3 = require('web3');
const web3 = new Web3("https://rinkeby.infura.io/v3/5503310e5d284cb1bbcd784f05369a0e")
const createUser = (req,res) => {

    const metamask_address= req.body.metamask_address;
    const name=req.body.name;
    const email=req.body.email;
    const mobile = req.body.mobile;
    const adharcardNo = req.body.adharcardNo;

    const user = new userModel({
        metamask_address,
        name,
        mobile,
        email,
        adharcardNo
    });

    user.save()
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        })
    res.send("Hello World Post");
};

const approve_user = async(req,res) => {
    const id = req.params.id; 
    if(req.body.approved){
        await userModel.updateOne({metamask_address:id},{$set: {approved:true}}); //approving user by moderator
        const data = await userModel.findOne({metamask_address:id}); //finding approved user details
        await propertyModel.updateMany({adharNo : data.adharcardNo},{$set: {metamask_address:id}}); //adding metamask address to that respective user properties
        res.sendStatus(200);
    }else{
        res.send("Not approved")
    }
    
}

const unapproved_users = async(req,res) => {
    const data = await userModel.find({approved:false});
    res.send(data);
}

const getUserApproved = async(req,res) => {
    const id = req.params.id;
    const data = await propertyModel.find({metamask_address:id});
    res.send(data);
}

const verifySign= async(req,res) => {
    const adharcardNo = req.body.msg;
    const signature = req.body.signature_data;
    const address = await web3.eth.accounts.recover(adharcardNo, signature);
    console.log(address)
    const userData = await userModel.findOne({metamask_address:address});
    console.log(userData)
    res.send(userData);
}

module.exports = {
    createUser,
    getUserApproved,
    approve_user,
    verifySign,
    unapproved_users
};