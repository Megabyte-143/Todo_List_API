const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
    {
        TASK: String,
        ID: Number,
        STATUS: { type:Boolean, default: false },
    }
);

const TaskModel = mongoose.model("TaskSchema", TaskSchema);

module.exports = TaskModel;

