const path = require("path");
const fs = require("fs/promises");
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

module.exports = {
  getDb,
  writeDb,
};
