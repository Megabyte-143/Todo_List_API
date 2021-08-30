const mongoose= require("mongoose");

const Schema = mongoose.Schema(
    {
        TASK: String,
        TIME: String,
        STATUS: Boolean,

    }
);

const Model = mongoose.model("Schema",Schema);

module.exports = Model;

