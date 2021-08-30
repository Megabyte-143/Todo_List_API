require("dotenv").config();

//IMPORTS
var express = require("express");
var mongoDB = require("mongodb");
var mongoose = require("mongoose");
var bodyParser= require("body-parser");

//INITIALIZATION
const todo = express();
todo.use(bodyParser.urlencoded({ extended: true }));
todo.use(bodyParser.json());

//MONGOOSE
mongoose.connect(process.env.MONGO_URL,{}).then(()=> console.log("MONGODB CONNECTED"));

//LISTEN
todo.listen(3000,()=>{
    console.log("Listeninggggg......");
});