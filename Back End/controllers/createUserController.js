const {approveduserModel,unapproveduserModel} = require('../models/userSchema');
const {propertyModel,rawPropertyModel} = require('../models/propertySchema');

const createUser = (req,res) => {

    const metamask_address= req.body.metamask_address;
    const name=req.body.name;
    const email=req.body.email;
    const mobile = req.body.mobile;
    const adharcardNo = req.body.adharcardno;

    const user = new unapproveduserModel({
        metamask_address,
        name,
        mobile,
        email,
        adharcardNo,
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

module.exports = {
    createUser,
    getUserApproved,
    approve_user
};