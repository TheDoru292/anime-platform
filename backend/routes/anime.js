const express = require("express");
const router = express.Router();

const anime = require("../controllers/animeController");
const checks = require("../lib/Checks");

router.post(
  "/new",
  checks.checkAnimeType,
  checks.checkAnimeGenres,
  checks.checkAnimeThemes,
  checks.checkAnimeRelations,
  anime.create
);

module.exports = router;
