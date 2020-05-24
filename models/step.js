const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var stepSchema = new mongoose.Schema({
    name: String,
    position: String
});

var Step = mongoose.model("Step", stepSchema);

module.exports = Step;