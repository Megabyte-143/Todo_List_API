require("dotenv").config();

//IMPORTS
var express = require("express");
var mongoDB = require("mongodb");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");

const Model = require("./database");

//INITIALIZATION
const todo = express();
todo.use(bodyParser.urlencoded({ extended: true }));
todo.use(bodyParser.json());

//MONGOOSE
mongoose.connect(process.env.MONGO_URL, {}).then(() => console.log("MONGODB CONNECTED"));

//LISTEN
todo.listen(3000, () => {
    console.log("Listeninggggg......");
});


// MAIN WORK


//To get the complete list 

todo.get("/", async (req, res) => {
    return res.send("hello");
});

todo.get("/new", async (req, res) => {
    const list = await Model.find();
    return res.json(list);
});

//To add task to the list
todo.post("/add", (req, res) => {
    const { newTask } = req.body;
    const addNewTask = Model.create(newTask);
    return res.json({
        list: addNewTask,
        message: "Added to the list",
    });
});

//To update the Task
todo.put("/update/:id",(req,res)=>{
    const updateList = await Model.findOneAndUpdate(
        {
            ID: req.params.id
        },
        {
            STATUS: true
        }
    );
    return res.json({updateList});
});

//To delete the task 
todo.delete("/delete:id", (req, res) => {

    const newList = await Model.findOneAndDelete({ ID: req.params.id });
    return res.json({
        list: newList,
        message: "Task Deleted",
    });
});


