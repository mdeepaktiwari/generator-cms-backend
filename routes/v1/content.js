const express = require("express");
const { rewrite } = require("../../controller/content");
const { auth } = require("../../middleware/auth");
const router = express.Router();

router.post("/rewrite", auth, rewrite);

module.exports = router;
