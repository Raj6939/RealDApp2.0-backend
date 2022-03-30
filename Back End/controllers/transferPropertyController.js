const propertyModel = require('../models/propertySchema.js');

const propertytransfer = async(req,res) => {

    const update = await propertyModel.updateOne(
        { $and: [{"prop_id": req.body.prop_id}, {"metamask_address": req.body.to}] },
        { $set: {"metamask_address": req.body.from} },
    );

    res.send("ok");
};

module.exports = {
    propertytransfer
};