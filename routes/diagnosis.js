const express = require("express");
const { diagnosis, diagnosisDetail } = require("../controllers/diagnosis");
const Diagnosis = require("../models/diagnosis");
const { auth } = require("../helpers/authorize");
const { paginate } = require("../helpers/pagination");

const diagnosisRouter = express.Router();

diagnosisRouter.get("/:id", auth, diagnosisDetail);
diagnosisRouter.get("/", auth, paginate(Diagnosis), diagnosis);
diagnosisRouter.post("/add", auth);
diagnosisRouter.put("/:id", auth);
diagnosisRouter.delete("/:id", auth);

module.exports = {
	diagnosisRouter,
};
