const express = require("express");
const passport = require("passport");
const router = express.Router();
require("../passport");

const manga = require("../controllers/mangaController");
const review = require('../controllers/reviewController');
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

router.put(
  "/",
  checks.checkMangaExists,
  checks.checkMangaType,
  checks.checkMangaGenres,
  checks.checkMangaThemes,
  checks.checkMangaRelations,
  manga.edit,
);

router.get(
  '/:mangaId/chapters',
  checks.checkMangaExists,
  manga.getChapterList,
)

router.get(
  '/:mangaId/stats',
  checks.checkMangaExists,
  stats.getMangaStats,
);

router.post(
  "/:mangaId/favorite",
  checks.checkMangaFavorited,
  manga.favorite,
);

router.delete(
  "/:mangaId/favorite",
  checks.checkMangaFavorited,
  manga.removeFavorite,
)

router.post(
  "/:mangaId/entry",
  passport.authenticate("jwt", { session: false }),
  checks.checkMangaExists,
  checks.checkMangaEntryExists,
  checks.checkMangaEntryStatus,
  manga.addEntry
);

router.delete(
  "/:mangaId/entry",
  passport.authenticate("jwt", { session: false }),
  checks.checkMangaExists,
  checks.checkMangaEntryExists,
  checks.checkMangaEntryStatus,
  manga.deleteEntry
);

router.get(
  "/:mangaId/review",
  checks.checkMangaExists,
  review.getAll
);

router.get(
  "/:mangaId/review/:reviewId",
  checks.checkMangaExists,
  checks.checkReviewExists,
  review.get,
);

router.post(
  "/:mangaId/review",
  passport.authenticate("jwt", { session: false }),
  checks.checkMangaExists,
  checks.checkUserReviewed,
  review.create,
);

router.put(
  "/:mangaId/review/:reviewId",
  passport.authenticate("jwt", { session: false }),
  checks.checkMangaExists,
  checks.checkReviewExists,
  checks.checkUserPostedReview,
  review.edit,
);

router.post(
  "/:mangaId/review/:reviewId/react",
  passport.authenticate("jwt", { session: false }),
  checks.checkMangaExists,
  checks.checkReviewExists,
  checks.checkReviewReactionExists,
  review.react,
);

router.delete(
  "/:mangaId/review/:reviewId/react",
  passport.authenticate("jwt", { session: false }),
  checks.checkReviewReactionExists,
  checks.checkUserReactedReview,
  review.removeReact,
);

module.exports = router;
