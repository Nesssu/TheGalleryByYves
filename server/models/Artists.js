const mongoose = require("mongoose");

const Artists = mongoose.Schema;

let artistSchema = new Artists ({
    name: {type: String},
    type: {type: String},
    bio: {type: String},
    image: {type: String},
    contentType: {type: String}
});

module.exports = mongoose.model("artists", artistSchema);