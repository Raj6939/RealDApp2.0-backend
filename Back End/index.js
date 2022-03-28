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

const dburl = process.env.DB_CONNECTION ;
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
app.use(user);
app.use(transfer);

app.listen(process.env.PORT,() => {
    console.log("running at 3000");
})