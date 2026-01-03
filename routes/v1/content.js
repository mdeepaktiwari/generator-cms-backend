const express = require("express");
const { rewrite, history } = require("../../controller/content");
const { auth } = require("../../middleware/auth");
const router = express.Router();

router.post("/rewrite", auth, rewrite);
router.get("/history", auth, history);

module.exports = router;
