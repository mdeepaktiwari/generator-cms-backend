const express = require("express");
const { generateImage, history } = require("../../controller/image");
const { auth } = require("../../middleware/auth");
const router = express.Router();

router.post("/generate", auth, generateImage);
router.get("/history", auth, history);

module.exports = router;
