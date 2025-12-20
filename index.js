const express = require("express");
const app = express();
const db = require("./db");

require("dotenv").config();
const PORT = process.env.PORT;

db();

app.get("/", (req, res) => {
  res.send("Welcome to the application");
});

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
