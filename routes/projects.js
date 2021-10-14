const express = require("express");
const router = express.Router();
const { getDb, writeDb } = require("../lib/dbControl");
const moment = require("moment");

const formatProject = (db, project) => {
  const start = moment(project.startDate);
  const end = moment(project.endDate);
  const now = moment();
  const totalDays = end.diff(start, "days");
  const passDays = now.diff(start, "days");
  const completedRate = Math.floor((passDays / totalDays) * 100);
  const supplier = db.suppliers.find(({ id }) => id === project.supplier);
  return {
    projectId: project.projectId,
    projectName: project.projectName,
    startDate: project.startDate,
    endDate: project.endDate,
    supplierName: supplier.name,
    supplierId: supplier.id,
    completedRate: completedRate,
  };
};

router.get("/", async (req, res) => {
  const db = await getDb();
  const projects = db.projects.map((p) => formatProject(db, p));
  res.status(200).json(projects);
});

module.exports = router;
