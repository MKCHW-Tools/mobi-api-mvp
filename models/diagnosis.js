require("dotenv").config();
const mongoose = require("mongoose");
const validator = require("validator");

const diagnosisSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	patient: {
		// id: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: "User",
		// },
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
		phone: {
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
		type: Boolean,
		default: false,
	},
	followup: [
		{
			date: {
				type: Date,
			},
			order: {
				type: Number,
			},
			type: {
				type: String,
			},
			details: {
				type: String,
			},
			media: [
				{
					filename: String,
					filetype: String,
					base64: String,
					url: String,
				},
			],
		},
	],
});

diagnosisSchema.statics.getDetail = async (id) => {
	const diagnosis = await Diagnosis.findOne({ _id: id });
	return diagnosis;
};

diagnosisSchema.statics.getDiagnosisByUser = async (userId, id) => {
	console.log("userID", userId);
	console.log("ResourceID", id);
	const diagnosis = await Diagnosis.findOne({ user: userId, _id: id });

	return diagnosis;
};

const Diagnosis = mongoose.model("Diagnosis", diagnosisSchema);
module.exports = Diagnosis;
