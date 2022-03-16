const express = require('express');
const dashboard = require('./routes/dashboard');
const property = require('./routes/property');
const mongoose = require('mongoose');
const app = express();

const dburl = 'mongodb+srv://rakesh:Pass123@cluster0.dd37o.mongodb.net/Land_Registry?retryWrites=true&w=majority';
mongoose.connect(dburl,{useNewUrlParser:true, useUnifiedTopology:true})
    .then((result) => {
        console.log("connected");
    })
    .catch((err) => console.log("not"));

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));

app.use((req, res, next) => {

    next();
});

app.use(dashboard);
app.use(property);

app.listen(3000,() => {
    console.log("running at 3000");
})