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

	const {} = diagnosis;

	response.status(200).send({
		result: "Success",
		diagnosis: {
			diagnosis: {
				user,
				patient,
				createdAt,
				lastUpdatedAt,
				details,
				pregnant,
				trimesters,
			},
		},
	});
};
