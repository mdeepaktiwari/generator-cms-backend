const express = require("express");
const authRouter = require("./auth");
const imageRouter = require("./image");
const router = express.Router();

router.use("/auth", authRouter);
router.use("/image", imageRouter);

module.exports = router;
