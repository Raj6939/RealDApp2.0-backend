const propertyModel = require('../models/propertySchema.js');

const propertyUpload = (req,res) => {
    
    console.log(req.body);

    const id=req.body.prop_id;
    const area=req.body.prop_area;
    const hn=req.body.prop_house_no;
    const ln=req.body.prop_landmark;
    const city=req.body.prop_city;
    const state=req.body.prop_state;
    const price=req.body.prop_price;
    const document=req.body.prop_document;
    const sno=req.body.prop_surveyNumber;

    const property = new propertyModel({
        'prop_id' : id,
        'prop_area' : area,
        'prop_house_no' : hn,
        'prop_landmark' : ln,
        'prop_city' : city,
        'prop_state' : state,
        'prop_price' : price,
        'prop_document': document,
        'prop_surveyNumber' :sno
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

const propertyget = (req,res) => {
    res.send("Hello World get");
}

module.exports = {
    propertyUpload,
    propertyget
};