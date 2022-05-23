const {approveduserModel,unapproveduserModel} = require('../models/userSchema');
const propertyModel = require('../models/propertySchema');
const Web3 = require('web3');
const web3 = new Web3("https://rinkeby.infura.io/v3/5503310e5d284cb1bbcd784f05369a0e")
const createUser = (req,res) => {

    const metamask_address= req.body.metamask_address;
    const name=req.body.name;
    const email=req.body.email;
    const mobile = req.body.mobile;
    const adharcardNo = req.body.adharcardno;
    const signature = req.body.signature;

    const user = new unapproveduserModel({
        metamask_address,
        name,
        mobile,
        email,
        adharcardNo,
        signature
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
    const data = await unapproveduserModel.findOne({metamask_address:id})
    data.approved = true;
    const user = new approveduserModel({
        metamask_address:data.metamask_address,
        name:data.name,
        email:data.email,
        mobile:data.mobile,
        adharcardNo:data.adharcardNo,
        signature:data.signature,
        approved:data.approved
    });
    await user.save();
    await unapproveduserModel.deleteOne({metamask_address:id});
    res.send(data);
}

const getUserApproved = async(req,res) => {
    const id = req.params.id;
    const data = await approveduserModel.findOne({metamask_address:id});
    // const property = await propertyModel.find({metamask_address:id})
    // const temp = await {...data['_doc'],properties:property}
    res.send(data);
}

const verifySign= async(req,res) => {
    const adharcardNo = req.body.msg;
    const signature = req.body.signature_data;
    const address = await web3.eth.accounts.recover(adharcardNo, signature);
    console.log(address)
    const userData = await approveduserModel.findOne({metamask_address:address});
    console.log(userData)
    res.send(userData);
}

module.exports = {
    createUser,
    getUserApproved,
    approve_user,
    verifySign
};