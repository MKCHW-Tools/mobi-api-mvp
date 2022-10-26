// const asyncHandler = require("express-async-handler");
const Diagnosis = require("../models/diagnosis");
const User = require("../models/user");

module.exports = {
	findDiagnosis: (userId) => {
		return new Promise((resolve, reject) => {
			Diagnosis.find({ user: { $elemMatch: { $eq: userId } } })
				.populate("diagnosis")
				.then((result) => {
					console.log("Result", result);
					resolve(result);
				})
				.catch((err) => {
					console.log("Error on geting diagnosis ", err);
					reject(err);
				});
		});
	},
	createDiagnosis: (diagnosis) => {
		return new Promise((resolve, reject) => {
			Diagnosis.create(diagnosis)
				.then((result) => {
					resolve(result);
				})
				.catch((err) => {
					console.log("Error on creating diagnosis", err);
				});
		});
	},

	findAllSortedDiagnosis: (criteria) => {
		return new Promise((resolve, reject) => {
			Diagnosis.find({
				user: { $elemMatch: { $eq: criteria._id } },
			})
				.populate("diagnosis")
				.sort({ lastUpdatedAt: -1 })
				.then((result) => {
					result = Diagnosis.populate(result, {
						model: "Diagnosis",
					});
					console.log("Result", result);
					resolve(result);
				})
				.catch((err) => {
					console.log("Error on geting diagnosis", err);
					reject(err);
				});
		});
	},
};
