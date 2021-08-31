require("dotenv").config();

//~~~~~~~~~~~~~~~~IMPORTS~~~~~~~~~~~~~~~~
var express = require("express");
var mongoDB = require("mongodb");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");

const TaskModel = require("./database");

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


//~~~~~~~~~~~~~~~~INITIALIZATION~~~~~~~~~~~~~~~~
const todo = express();
todo.use(bodyParser.urlencoded({ extended: true }));
todo.use(bodyParser.json());

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


//~~~~~~~~~~~~~~~~MONGOOSE~~~~~~~~~~~~~~~~
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
}).then(() => console.log("MONGODB CONNECTED"));

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


//~~~~~~~~~~~~~~~~MAIN WORK~~~~~~~~~~~~~~~~


//To get the complete list 
/*
    Route               /
    Description         Get all Tasks
    Parameter           none
    Methods             GET
    Access              PUBLIC
*/
todo.get("/", async (req, res) => {
    const list = await TaskModel.find();
    return res.json(list);
});


//To add task to the list
/*
    Route               /add
    Description         To add task
    Access              PUBLIC
    Parameter           none
    Methods             POST
*/
todo.post("/add", (req, res) => {
    const { newTask } = req.body;
    const list = TaskModel.create(newTask);
    return res.json({
        list: { TaskModel },
        message: "Added to the list",
    });
});

//To update the Task
/*
    Route               /update
    Description         To update the status of the specific task
    Access              PUBLIC
    Parameter           id
    Methods             PUT
*/
todo.put("/update/:id", async (req, res) => {
    const updateList = await TaskModel.findOneAndUpdate(
        {
            ID: req.params.id
        },
        {
            STATUS: false,
        },
        {
            new: true
        }
    );
    return res.json({ updateList });
});

//To delete the task 
/*
    Route               /delete
    Description         To delete the specific task
    Access              PUBLIC
    Parameter           id
    Methods             DELETE
*/
todo.delete("/delete/:id", async (req, res) => {

    const newList = await TaskModel.findOneAndDelete({
        ID: req.params.id.toString
    });
    return res.json({
        list: { TaskModel },
        message: "Task Deleted",
    });
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


//~~~~~~~~~~~~~~~~LISTEN~~~~~~~~~~~~~~~~
todo.listen(3000, () => {
    console.log("Listeninggggg......");
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~