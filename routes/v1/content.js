const express = require("express");
const { generateContent, history } = require("../../controller/content");
const { auth } = require("../../middleware/auth");
const router = express.Router();

router.post("/:action", auth, generateContent);
router.get("/history", auth, history);

module.exports = router;
