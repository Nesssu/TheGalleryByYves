const mongoose = require("mongoose");

const Exhibitions = mongoose.Schema;

let exhibitionSchema = new Exhibitions ({
    date: {type: String},
    time: {type: String},
    title: {type: String},
    artist: {type: String},
    about: {type: String},
    image: {type: String},
    contentType: {type: String},
    type: {type: String}
});

module.exports = mongoose.model("exhibitions", exhibitionSchema);