const express = require("express");
const passport = require("passport");
const router = express.Router();
require("../passport");

const anime = require("../controllers/animeController");
const checks = require("../lib/Checks");

router.post(
  "/",
  checks.checkAnimeType,
  checks.checkAnimeGenres,
  checks.checkAnimeThemes,
  checks.checkAnimeRelations,
  anime.create
);

router.get("/:animeId", anime.get);

router.delete("/:animeId", checks.checkAnimeExists, anime.delete);

router.put(
  "/:animeId",
  checks.checkAnimeType,
  checks.checkAnimeGenres,
  checks.checkAnimeThemes,
  checks.checkAnimeRelations,
  anime.edit
);

router.post(
  "/:animeId/entry",
  passport.authenticate("jwt", { session: false }),
  checks.checkAnimeExists,
  checks.checkAnimeEntryExists,
  checks.checkAnimeEntryStatus,
  anime.addEntry
);

router.delete(
  "/:animeId/entry",
  passport.authenticate("jwt", { session: false }),
  checks.checkAnimeExists,
  checks.checkAnimeEntryExists,
  checks.checkAnimeEntryStatus,
  anime.deleteEntry
);

module.exports = router;
