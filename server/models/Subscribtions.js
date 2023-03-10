const mongoose = require("mongoose");

const Subscribtions = mongoose.Schema;

let subscribtionSchema = new Subscribtions ({
    email: {type: String}
});

module.exports = mongoose.model("subscribtions", subscribtionSchema);