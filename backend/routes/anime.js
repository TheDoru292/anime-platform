const express = require("express");
const router = express.Router();

const anime = require("../controllers/animeController");
const checks = require("../lib/Checks");

router.get("/:animeId", anime.get);

router.delete("/:animeId", anime.delete);

router.post(
  "/",
  checks.checkAnimeType,
  checks.checkAnimeGenres,
  checks.checkAnimeThemes,
  checks.checkAnimeRelations,
  anime.create
);

module.exports = router;
