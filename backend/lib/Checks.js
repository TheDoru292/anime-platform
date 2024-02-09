const Type = require("../models/AnimeType");
const Genre = require("../models/AnimeGenre");
const Theme = require("../models/AnimeTheme");
const Anime = require("../models/Anime");
const AnimeEntry = require("../models/AnimeEntry");
const Manga = require("../models/Manga");
const MangaGenre = require("../models/MangaGenre");
const MangaType = require("../models/MangaType");
const MangaTheme = require("../models/MangaTheme");
const Favorite = require("../models/Favorite");
const Review = require('../models/Review');
const ReviewReaction = require('../models/ReviewReaction');
const MangaEntry = require('../models/MangaEntry');

exports.checkAnimeType = (req, res, next) => {
  if (req.body.type) {
    Type.findOne({ _id: req.body.type })
      .then((type) => {
        if (!type) {
          return res.status(400).json({
            success: false,
            error: "Provided type does not exist!",
          });
        }
      })
      .catch((err) => {
        return res.status(400).json({
          success: false,
          error: "Please check the type you have sent.",
        });
      });
  }

  next();
};

exports.checkAnimeGenres = (req, res, next) => {
  if (req.body.genres) {
    for (let i = 0; req.body.genres.length > i; i++) {
      Genre.find({ _id: req.body.genres[i] })
        .then((genre) => {
          if (!genre) {
            return res.status(400).json({
              success: false,
              error: "Provided genre(s) do not exist!",
            });
          }
        })
        .catch((err) => {
          return res.status(400).json({
            success: false,
            error: "Please check the genre type you have sent.",
          });
        });
    }
  }

  next();
};

exports.checkAnimeThemes = (req, res, next) => {
  if (req.body.themes) {
    for (let i = 0; req.body.themes.length > i; i++) {
      Theme.find({ _id: req.body.themes[i] })
        .then((theme) => {
          if (!theme) {
            return res.status(400).json({
              success: false,
              error: "Provided theme(s) do not exist!",
            });
          }
        })
        .catch((err) => {
          return res.status(400).json({
            success: false,
            error: "Please check the theme type you have sent.",
          });
        });
    }
  }

  next();
};

exports.checkAnimeRelations = (req, res, next) => {
  if (req.body.relations) {
    for (const key in req.body.relations) {
      for (let i = 0; req.body.relations[key].length > i; i++) {
        if (key == "adaptation") {
          // Check if Manga exists in the database
        } else {
          Anime.findOne({ _id: req.body.relations[key][i] })
            .then((anime) => {
              if (!anime) {
                return res.status(400).json({
                  success: false,
                  error: "Anime in relations does not exist",
                });
              }
            })
            .catch((err) => next(err));
        }
      }
    }
  }

  next();
};

exports.checkAnimeEntryStatus = (req, res, next) => {
  const statuses = [
    "Watching",
    "Completed",
    "On-Hold",
    "Dropped",
    "Plan to Watch",
  ];

  if (statuses.includes(req.body.status)) {
    next();
  } else {
    return res.json({ success: false, message: "Please check the status!" });
  }
};

exports.checkAnimeExists = (req, res, next) => {
  Anime.findOne({ _id: req.params.animeId })
    .then((anime) => {
      if (!anime) {
        return res
          .status(400)
          .json({ success: false, status: "Anime doesn't exist." });
      }

      next();
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.checkAnimeEntryExists = (req, res, next) => {
  AnimeEntry.findOne({
    user: req.user._id,
    anime: req.params.animeId,
  })
    .then((animeEntry) => {
      if (animeEntry) {
        req.animeEntryExists = true;
      } else {
        req.animeEntryExists = false;
      }

      next();
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.checkMangaType = (req, res, next) => {
  if (req.body.type) {
    MangaType.findOne({ _id: req.body.type })
      .then((type) => {
        if (!type) {
          return res.status(400).json({
            success: false,
            error: "Provided type does not exist!",
          });
        }
      })
      .catch((err) => {
        return res.status(400).json({
          success: false,
          error: "Please check the type you have sent.",
        });
      });
  }

  next();
};

exports.checkMangaGenres = (req, res, next) => {
  if (req.body.genres) {
    for (let i = 0; req.body.genres.length > i; i++) {
      MangaGenre.find({ _id: req.body.genres[i] })
        .then((genre) => {
          if (!genre) {
            return res.status(400).json({
              success: false,
              error: "Provided genre(s) do not exist!",
            });
          }
        })
        .catch((err) => {
          return res.status(400).json({
            success: false,
            error: "Please check the genre type you have sent.",
          });
        });
    }
  }

  next();
};

exports.checkMangaThemes = (req, res, next) => {
  if (req.body.themes) {
    for (let i = 0; req.body.themes.length > i; i++) {
      MangaTheme.find({ _id: req.body.themes[i] })
        .then((theme) => {
          if (!theme) {
            return res.status(400).json({
              success: false,
              error: "Provided theme(s) do not exist!",
            });
          }
        })
        .catch((err) => {
          return res.status(400).json({
            success: false,
            error: "Please check the theme type you have sent.",
          });
        });
    }
  }

  next();
};

exports.checkMangaRelations = (req, res, next) => {
  if (req.body.relations) {
    for (const key in req.body.relations) {
      for (let i = 0; req.body.relations[key].length > i; i++) {
        if (key == "adaptation") {
          Anime.findOne({ _id: req.body.relations[key][i] })
            .then((anime) => {
              if (!anime) {
                return res.status(400).json({
                  success: false,
                  error: "Anime in relations does not exist",
                });
              }
            })
            .catch((err) => next(err));
        } else {
          // Check if Manga exists in the database
        }
      }
    }
  }

  next();
};

exports.checkMangaExists = (req, res, next) => {
  Manga.findOne({ _id: req.params.mangaId })
    .then((manga) => {
      if (!manga) {
        return res
          .status(400)
          .json({ success: false, status: "Manga doesn't exist." });
      }

      next();
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.checkAnimeFavorited = (req, res, next) => {
  Favorite.findOne({ user: req.user._id, anime: req.params.animeId })
    .then((favorite) => {
      if (favorite) {
        req.animeFavorited = true;
      } else {
        req.animeFavorited = false;
      }

      next();
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.checkUserReviewed = (req, res, next) => {
  Review.findOne(
    {
      user: req.user,
      anime: req.params.animeId ? req.params.animeId : null,
      manga: req.params.mangaId ? req.params.mangaId : null,
    }
  ).then((review) => {
    if (review) {
      req.reviewed = true;
    } else {
      req.reviewed = false;
    }

    next();
  }).catch((err) => {
    console.log(err);
  })
}

exports.checkUserPostedReview = (req, res, next) => {
  Review.findOne(
    {
      _id: req.params.reviewId
    }
  ).then((review) => {
    if (review.user === req.user) {
      req.reviewOwner = true;
    } else {
      req.reviewOwner = false;
    }

    next();
  }).catch((err) => {
    console.log(err);
  })
}

exports.checkUserReactedReview = (req, res, next) => {
  ReviewReaction.findOne(
    {
      user: req.user,
      review: req.params.reviewId,
    }
  ).then((review) => {
    if (review.user === req.user) {
      req.reviewReactOwner = true;
    } else {
      req.reviewReactOwner = false;
    }

    next();
  }).catch((err) => {
    console.log(err);
  })
}

exports.checkReviewExists = (req, res, next) => {
  Review.findOne({ _id: req.params.reviewId })
    .then((review) => {
      if (!review) {
        res.status(404).json({ success: false, status: "Review doesn't exist" })
      }

      next()
    })
    .catch((err) => {
      console.log(err);
    })
}

exports.checkReviewReactionExists = (req, res, next) => {
  ReviewReaction.findOne({ review: req.params.reviewId, user: req.user })
    .then((reviewReaction) => {
      if (reviewReaction) {
        req.react = reviewReaction;
        req.reacted = true;
      } else {
        req.reacted = false;
      }

      next();
    })
    .catch((err) => {
      console.log(err);
    })
}

exports.checkMangaEntryExists = (req, res, next) => {
  MangaEntry.findOne({
    user: req.user._id,
    manga: req.params.mangaId,
  })
    .then((mangaEntry) => {
      if (mangaEntry) {
        req.mangaEntryExists = true;
      } else {
        req.mangaEntryExists = false;
      }

      next();
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.checkMangaEntryStatus = (req, res, next) => {
  const statuses = [
    "Reading",
    "Completed",
    "On-Hold",
    "Dropped",
    "Plan to Read",
  ];

  if (statuses.includes(req.body.status)) {
    next();
  } else {
    return res.json({ success: false, message: "Please check the status!" });
  }
};
