const Diagnosis = require("../models/diagnosis");

exports.diagnosis = async (request, response) => {
	const {
		total,
		paginatedDocs: { next = 0 },
		paginatedDocs: { previous = 0 },
		paginatedDocs,
	} = response;

	if (!paginatedDocs) return response.status(404).send("Diagnosis not found");

	const { docs: diagnosis } = paginatedDocs;

	return response.status(200).json({
		result: "Success",
		total,
		next,
		previous,
		diagnosis,
	});
};

exports.diagnosisDetail = async (request, response) => {
	const { id } = request.params;

	if (!id) return response.status(404).send("Not Found");

	const diagnosis = await Diagnosis.getDetail(id);

	if (!diagnosis)
		return response.status(404).json({
			result: "Failure",
			msg: "Details for a diagnosis are Not Found",
		});

	response.status(200).send({
		result: "Success",
		diagnosis,
	});
};
exports.diagnosisNew = async function (req, res) {
	const { _id } = req.user;

	req.body.user = _id;

	const diagnosis = new Diagnosis(req.body);

	await diagnosis.save();

	if (diagnosis) return res.status(201).send(diagnosis);
	else res.status(500).send("Failed to save Diagnosis");
};

exports.diagnosisUpdate = async (request, response) => {
	const { _id: userId } = request.user;
	if (!userId) return response.status(400).send("Not allowed to update this");
	const { id } = request.params;
	const result = await Diagnosis.updateOne(
		{ user: userId, _id: id },
		{ $set: { ...request.body } }
	);

	if (!result)
		return response.status(404).json({
			result: "Failure",
			msg: "Details for a diagnosis are Not Found",
		});

	return response.status(200).json({
		result: "Success",
		new: await Diagnosis.getDetail(id),
	});
};

exports.diagnosisDestroy = async (request, response) => {
	const { _id: userId } = request.user;
	if (!userId)
		return response.status(400).send("Not allowed to update this! ");
	const { id } = request.params;
	const result = await Diagnosis.deleteOne({ user: userId, _id: id });

	if (!result)
		return response.status(404).json({
			result: "Failure",
			msg: "Failure on Delete.",
		});

	return response.status(200).json({
		result: "Success",
		msg: "Resource deleted!",
	});
};
