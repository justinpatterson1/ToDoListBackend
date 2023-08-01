const express = require('express')
const mongoose =  require('mongoose')
const listController = require('./Controller/listController.js')

if(process.env.NODE_ENV!="production")
{
    require("dotenv").config({path:"config/Keys.env"})
}


app = express();

app.use(express.json());

app.use('/list',listController)

app.listen(3000,()=>{
    mongoose.connect(process.env.MONGODB_CONNECT,{useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=>{
            console.log("Mongo DB is connected")
        })
        .catch((err)=>{
            console.log(`Error occured :${err}`)
        })
})