const mongoose = require("mongoose");

const Exhibitions = mongoose.Schema;

let exhibitionSchema = new Exhibitions ({
    date: {type: Date},
    title: {type: String},
    artist: {type: String},
    about: {type: String},
    image: {type: Buffer}
});

module.exports = mongoose.model("exhibitions", exhibitionSchema);