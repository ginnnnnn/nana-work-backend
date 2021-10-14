const express = require("express");
const app = express();
const projectRoute = require("./routes/project");

app.use(express.json());

app.use("/api/project", projectRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
