const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
require('dotenv/config');

app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'/public')));

app.use(bodyParser.urlencoded({extended:false}));

app.use(expressSession({
    secret:'A keyboard cat',
    saveUninitialized:true,
    resave:true
}));


app.use('/',require('./routes/index'))

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("Up and running Bro");
});