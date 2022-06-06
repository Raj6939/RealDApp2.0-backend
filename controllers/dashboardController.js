const {newpropertyModel} = require('../models/propertySchema.js');
const { response } = require('express');

const home = async(req,res) => {
    
    const property = await newpropertyModel.find();
    res.send(property);
    
};

module.exports = home;