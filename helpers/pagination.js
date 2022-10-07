const e = require("express");

const paginate = (model, owner = null) => {
	return async (req, res, next) => {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;

		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		const data = {};

		if (
			endIndex <
			(await model.countDocuments(owner && { user: req.user._id }).exec())
		) {
			data.next = {
				page: page + 1,
				limit: limit,
			};
		}

		if (startIndex > 0) {
			data.previous = {
				page: page - 1,
				limit: limit,
			};
		}

		try {
			data.docs = await model
				.find(owner && { user: req.user._id })
				.limit(limit)
				.skip(startIndex)
				.exec();
			res.paginatedDocs = data;
			res.total = await model
				.countDocuments(owner && { user: req.user._id })
				.exec();
			next();
		} catch (e) {
			res.status(500).json({ message: e.message });
		}
	};
};

module.exports = { paginate };
