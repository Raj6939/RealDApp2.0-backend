const {propertyModel,rawPropertyModel} = require('../models/propertySchema.js');

const home = async(req,res) => {
    const property = await propertyModel.find();
    res.send(property);
};

module.exports = home;