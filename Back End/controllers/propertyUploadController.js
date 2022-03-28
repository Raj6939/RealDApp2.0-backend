const {propertyModel,rawPropertyModel} = require('../models/propertySchema.js');

const propertyUpload = (req,res) => {

    const metamask_address= req.body.metamask_address;
    const prop_id=req.body.prop_id;
    const prop_area=req.body.prop_area;
    const prop_house_no=req.body.prop_house_no;
    const prop_landmark=req.body.prop_landmark;
    const prop_city=req.body.prop_city;
    const prop_state=req.body.prop_state;
    const prop_price=req.body.prop_price;
    const prop_document=req.body.prop_document;
    const prop_surveyNumber=req.body.prop_surveyNumber;

    const property = new rawPropertyModel({
        metamask_address,
        prop_id,
        prop_area,
        prop_house_no,
        prop_landmark,
        prop_city,
        prop_state,
        prop_price,
        prop_document,
        prop_surveyNumber
    });

    property.save()
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        })
    res.send("Hello World Post");
};

const approvedPropertyUpload = (req,res) => {

    const metamask_address= req.body.metamask_address;
    const prop_id=req.body.prop_id;
    const prop_area=req.body.prop_area;
    const prop_house_no=req.body.prop_house_no;
    const prop_landmark=req.body.prop_landmark;
    const prop_city=req.body.prop_city;
    const prop_state=req.body.prop_state;
    const prop_price=req.body.prop_price;
    const prop_document=req.body.prop_document;
    const prop_surveyNumber=req.body.prop_surveyNumber;
    
    const property = new propertyModel({
        metamask_address,
        prop_id,
        prop_area,
        prop_house_no,
        prop_landmark,
        prop_city,
        prop_state,
        prop_price,
        prop_document,
        prop_surveyNumber
    });

    property.save()
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        })
    res.send("Hello World Post");
}

const getproperty = async(req,res) => {
    const data = await propertyModel.find();
    res.send(data);
}

module.exports = {
    propertyUpload,
    getproperty,
    approvedPropertyUpload
};