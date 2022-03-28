const propertyModel = require('../models/propertySchema.js');

const propertytransfer = async(req,res) => {

    const update = await propertyModel.updateOne(
        { $and: [{"prop_id": req.body.prop_id}, {"prop_owner": req.body.to}] },
        { $set: {"prop_owner": req.body.from} },
    );

    res.send("ok");
};

module.exports = {
    propertytransfer
};