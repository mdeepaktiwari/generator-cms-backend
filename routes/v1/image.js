const express = require("express");
const { generateImage } = require("../../controller/image");
const { auth } = require("../../middleware/auth");
const router = express.Router();

router.post("/generate", auth, generateImage);

module.exports = router;

// /v1/image/generate
