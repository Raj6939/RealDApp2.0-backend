const express = require('express');
const cors = require('cors');
const dashboard = require('./routes/dashboard');
const property = require('./routes/property');
const user = require('./routes/user');
const transfer = require('./routes/transfer.js');
const mongoose = require('mongoose');
require('dotenv/config'); 
const app = express();

app.use(cors());
const dburl = "mongodb+srv://rakesh:rakesh12@cluster0.dd37o.mongodb.net/Land_Registry?retryWrites=true&w=majority"
// const dburl = "mongodb+srv://rajpatil:idkid@cluster0.9kquv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(dburl,{useNewUrlParser:true, useUnifiedTopology:true})
    .then((result) => {
        console.log("connected index");
    })
    .catch((err) => console.log("not index"));

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));

app.use((req, res, next) => {

    next();
});


app.use(dashboard);
app.use(user);
app.use(transfer);
app.use(property);

app.listen(3000,() => {
    console.log("running at 3000");
})