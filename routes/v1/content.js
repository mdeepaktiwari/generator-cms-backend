const express = require("express");
const {
  generateContent,
  history,
  contentWithId,
  searchContent,
} = require("../../controller/content");
const { auth } = require("../../middleware/auth");
const router = express.Router();

router.post("/:action", auth, generateContent);
router.get("/history", auth, history);
router.get("/search", auth, searchContent);
router.get("/:id", auth, contentWithId);

module.exports = router;
