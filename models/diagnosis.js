require("dotenv").config();
const mongoose = require("mongoose");
const validator = require("validator");

const diagnosisSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	patient: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		name: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
		},
		gender: {
			type: String,
			required: true,
		},
		location: {
			type: String,
		},
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	lastUpdatedAt: {
		type: Date,
		default: Date.now,
	},
	details: {
		type: String,
		required: true,
		trim: true,
	},
	pregnant: {
		type: Number,
	},
	trimesters: [
		{
			no: {
				type: Number,
			},
			info: {
				type: String,
			},
			date: {
				type: String,
			},
		},
	],
});

diagnosisSchema.statics.getDetail = async (id) => {
	const diagnosis = await Diagnosis.findOne({ _id: id });
	return diagnosis;
};
module.exports = mongoose.model("Diagnosis", diagnosisSchema);
