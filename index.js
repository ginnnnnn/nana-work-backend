const express = require("express");
const app = express();
const projectRoute = require("./routes/project");
const projectsRoute = require("./routes/projects");
const authRoute = require("./routes/auth");

app.use(express.json());

app.use("/api/project", projectRoute);
app.use("/api/projects", projectsRoute);

app.use("/api/auth", authRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
