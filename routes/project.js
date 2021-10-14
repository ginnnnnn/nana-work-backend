const express = require("express");
const path = require("path");
const fs = require("fs/promises");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const dbPath = path.join(process.cwd(), "db.json");

const getDb = async () => {
  const dbJson = (await fs.readFile(dbPath)).toString();
  const db = JSON.parse(dbJson);
  return db;
};
const writeDb = async (updatedDb) => {
  await fs.writeFile(dbPath, JSON.stringify(updatedDb));
};

router.post("/", async (req, res) => {
  try {
    const db = await getDb();
    const projects = db.projects;
    const project = { ...req.body, projectId: uuidv4() };
    projects.push(project);

    await writeDb({
      ...db,
      projects,
    });
    res.status(201).json(project);
  } catch (err) {
    return res.status(500).end();
  }
});
module.exports = router;
