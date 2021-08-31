const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
    {
        TASK: String,
        ID: String,
        STATUS: Boolean,
    }
);

const TaskModel = mongoose.model("TaskSchema", TaskSchema);

module.exports = TaskModel;

