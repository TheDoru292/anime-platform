const express = require("express");
const passport = require("passport");
const router = express.Router();
require("../passport");

const anime = require("../controllers/animeController");
const review = require("../controllers/reviewController");
const stats = require("../controllers/statsController");
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

router.get("/:animeId/stats", checks.checkAnimeExists, stats.getAnimeStats);

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

router.post(
  "/:animeId/favorite",
  passport.authenticate("jwt", { session: false }),
  checks.checkAnimeExists,
  checks.checkAnimeFavorited,
  anime.favoriteAnime
);

router.delete(
  "/:animeId/favorite",
  passport.authenticate("jwt", { session: false }),
  checks.checkAnimeExists,
  checks.checkAnimeFavorited,
  anime.removeFavoriteAnime
);

router.get("/:animeId/review", checks.checkAnimeExists, review.getAll);

router.get(
  "/:animeId/review/:reviewId",
  checks.checkAnimeExists,
  checks.checkReviewExists,
  review.get
);

router.post(
  "/:animeId/review",
  passport.authenticate("jwt", { session: false }),
  checks.checkAnimeExists,
  checks.checkUserReviewed,
  review.create
);

router.put(
  "/:animeId/review/:reviewId",
  passport.authenticate("jwt", { session: false }),
  checks.checkAnimeExists,
  checks.checkReviewExists,
  checks.checkUserPostedReview,
  review.edit
);

router.delete(
  "/:animeId/review/:reviewId",
  passport.authenticate("jwt", { session: false }),
  checks.checkAnimeExists,
  checks.checkReviewExists,
  checks.checkUserPostedReview,
  review.delete
);

router.post(
  "/:animeId/review/:reviewId/react",
  passport.authenticate("jwt", { session: false }),
  checks.checkAnimeExists,
  checks.checkReviewExists,
  checks.checkReviewReactionExists,
  review.react
);

router.delete(
  "/:animeId/review/:reviewId/react",
  passport.authenticate("jwt", { session: false }),
  checks.checkReviewReactionExists,
  checks.checkUserReactedReview,
  review.removeReact
);

module.exports = router;
