const express = require("express");
const {
  generateContent,
  history,
  contentWithId,
} = require("../../controller/content");
const { auth } = require("../../middleware/auth");
const router = express.Router();

router.post("/:action", auth, generateContent);
router.get("/history", auth, history);
router.get("/:id", auth, contentWithId);

module.exports = router;
