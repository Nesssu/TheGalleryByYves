const mongoose = require("mongoose");

const Artists = mongoose.Schema;

let artistSchema = new Artists ({
    name: {type: String},
    bio: {type: String},
});

module.exports = mongoose.model("artists", artistSchema);