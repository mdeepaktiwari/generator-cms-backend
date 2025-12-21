const express = require("express");
const cors = require("cors");
const router = require("./routes/v1");
const app = express();
const db = require("./db");

require("dotenv").config();
const PORT = process.env.PORT;

db();

app.use(cors());
// parse json
app.use(express.json());

app.use("/v1", router);

app.get("/", (req, res) => {
  res.send("Welcome to the application");
});

// 404 handler - should be after all routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
