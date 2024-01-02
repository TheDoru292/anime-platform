const express = require("express");
const passport = require("passport");
const router = express.Router();
require("../passport");

const manga = require("../controllers/mangaController");
const checks = require("../lib/Checks");

router.post(
  "/",
  checks.checkMangaType,
  checks.checkMangaGenres,
  checks.checkMangaThemes,
  checks.checkMangaRelations,
  manga.create
);

router.get("/:mangaId", manga.get);

router.delete("/:mangaId", checks.checkMangaExists, manga.delete);

module.exports = router;
