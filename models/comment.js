// require mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const comSchema = new Schema({
	title: String,
	text: String
});

const comment = mongoose.model("comment", comSchema);

module.exports = comment;