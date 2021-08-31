const mongoose = require("mongoose");

const Schema = mongoose.Schema(
    {
        TASK: String,
        ID: String,
        STATUS: false,
    }
);

const Model = mongoose.model("Schema", Schema);

module.exports = Model;

