const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs/promises");

const dbPath = path.join(process.cwd(), "db.json");

const getDb = async () => {
  const dbJson = (await fs.readFile(dbPath)).toString();
  const db = JSON.parse(dbJson);
  return db;
};

router.get("/current-user", (req, res) => {
  res.json({ shit: "s" });
});

router.post("/sign-in", async (req, res) => {
  const { account, password } = req.body;
  if (!account || !password) {
    return res.status(401).end();
  }
  const db = await getDb();
  const users = db.users;
  // {
  //   "supplier": "company-1",
  //   "name": "andy",
  //   "role": "project-manager",
  //   "userId": "user-1",
  //   "account": "pm-001",
  //   "password": "pm-001"
  // },
  const user = users.find(
    (user) => user.account === account && user.password === password
  );
  if (!user) {
    return res.status(403).end({ message: "帳號密碼組合有誤" });
  }
  res.status(200).json({
    ...user,
    password: undefined,
  });
});

module.exports = router;
