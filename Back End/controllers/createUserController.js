const userModel = require('../models/userSchema');
const {propertyModel,rawPropertyModel} = require('../models/propertySchema');

const createUser = (req,res) => {

    const metamask_address= req.body.metamask_address;
    const name=req.body.name;
    const email=req.body.email;
    const mobile = req.body.mobile;

    const user = new userModel({
        metamask_address,
        name,
        mobile,
        email
        // 'address' : req.body.address,
        // 'adharcardNo' : req.body.adharcardNo,
        // 'pancardNo' : req.body.pancardNo,
        // 'adhar_hash': req.body.adhar_hash,
        // 'pan_hash' :req.body.pan_hash
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

const getUser = async(req,res) => {
    const {id} = req.params;
    const data = await userModel.findOne({metamask_address:id});
    const property = await rawPropertyModel.find({metamask_address:id})
    const temp = {...data['_doc'],properties:property}
    console.log(temp);
    res.send(temp);
}

module.exports = {
    createUser,
    getUser
};