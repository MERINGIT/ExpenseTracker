
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const users = require("./routes/users");
app.use("/api", users);
const expense = require("./routes/expense");
app.use("/expense", expense);
// const trigger = require("./routes/trigger");
// app.use("/events", trigger);
db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
