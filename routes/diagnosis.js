const express = require("express");
const {
	diagnosis,
	diagnosisDetail,
	diagnosisNew,
	diagnosisUpdate,
	diagnosisDestroy,
} = require("../controllers/diagnosis");
const Diagnosis = require("../models/diagnosis");
const { auth } = require("../helpers/authorize");
const { paginate } = require("../helpers/pagination");

const diagnosisRouter = express.Router();

diagnosisRouter.get("/:id", auth, diagnosisDetail);
diagnosisRouter.get("/", auth, paginate(Diagnosis, true), diagnosis);
diagnosisRouter.post("/", auth, diagnosisNew);
diagnosisRouter.put("/:id", auth, diagnosisUpdate);
diagnosisRouter.delete("/:id", auth, diagnosisDestroy);

module.exports = {
	diagnosisRouter,
};
