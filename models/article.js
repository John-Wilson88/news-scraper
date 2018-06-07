// require mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const artSchema = new Schema ({
	headline:{
		type: String,
		required: true
	},
	summary: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: false
	},
	noteID: {
		type: Schema.Types.ObjectId,
		ref: "comment"
	}
});

const article = mongoose.model("article", artSchema);

module.exports = article;