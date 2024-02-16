const { body, validationResult } = require("express-validator");

const Anime = require("../models/Anime");
const AnimeEntry = require("../models/AnimeEntry");
const Favorite = require("../models/Favorite");
const Episode = require("../models/Episode");

exports.create = [
  body("title").trim().isLength({ min: 1 }).escape(),
  body("cover").trim(),
  body("status").trim().isLength({ min: 1 }).escape(),
  body("broadcast").trim().escape(),
  body("synopsys").trim().escape(),
  body("episodes").isInt({ min: 1 }),
  body("duration").isInt({ min: 1 }),
  body("source").trim().isLength({ min: 1 }).escape(),
  body("ratings").trim().isLength({ min: 1 }).escape(),

  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    let animeObj = {
      title: req.body.title,
      cover: req.body.cover || "",
      type: req.body.type,
      genres: req.body.genres || [],
      themes: req.body.themes || [],
      status: req.body.status,
      broadcast: req.body.broadcast,
      source: req.body.source,
      synopsys: req.body.synopsys,
      episodes: req.body.episodes,
      duration: req.body.duration,
      ratings: req.body.ratings,
      alternativeTitles: req.body.alternativeTitles || {},
      airDate: req.body.airDate || {},
      relations: req.body.relations || {},
    };

    Anime.create(animeObj)
      .then((anime) => {
        return res.status(200).json({ success: true, anime });
      })
      .catch((err) => {
        next(err);
      });
  },
];

exports.get = (req, res) => {
  Anime.findOne({ _id: req.params.animeId })
    .then((anime) => {
      return res.json({ success: true, anime });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.delete = (req, res) => {
  Anime.deleteOne({ _id: req.params.animeId })
    .then((anime) => {
      return res.json({ success: true, message: "Anime deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.edit = [
  body("title").trim().isLength({ min: 1 }).escape(),
  body("cover").trim(),
  body("status").trim().isLength({ min: 1 }).escape(),
  body("broadcast").trim().escape(),
  body("synopsys").trim().escape(),
  body("episodes").isInt({ min: 1 }),
  body("duration").isInt({ min: 1 }),
  body("source").trim().isLength({ min: 1 }).escape(),
  body("ratings").trim().isLength({ min: 1 }).escape(),

  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    let animeObj = {
      title: req.body.title,
      cover: req.body.cover || "",
      type: req.body.type,
      genres: req.body.genres || [],
      themes: req.body.themes || [],
      status: req.body.status,
      broadcast: req.body.broadcast,
      source: req.body.source,
      synopsys: req.body.synopsys,
      episodes: req.body.episodes,
      duration: req.body.duration,
      ratings: req.body.ratings,
      alternativeTitles: req.body.alternativeTitles || {},
      airDate: req.body.airDate || {},
      relations: req.body.relations || {},
    };

    Anime.updateOne({ _id: req.params.animeId }, animeObj)
      .then((anime) => {
        return res.status(200).json({ success: true, anime });
      })
      .catch((err) => {
        next(err);
      });
  },
];

exports.addEntry = [
  async (req, res) => {
    const anime = await Anime.findOne({ _id: req.params.animeId })
      .then((anime) => {
        return anime;
      })
      .catch((err) => console.log(err));

    if (req.body.episodes > anime.episodes || req.body.episodes < 0) {
      return res.json({
        success: false,
        messages: "Please check the episodes count.",
      });
    }

    if (req.body.score > 10 || req.body.score < 0) {
      return res.json({ success: false, messages: "Please check the score." });
    }

    if (req.body.status == "Completed") {
      req.body.episodes = anime.episodes;
    }

    const time = req.body.episodes * anime.duration;

    if (!req.animeEntryExists) {
      AnimeEntry.create({
        user: req.user,
        anime: req.params.animeId,
        episodes: req.body.episodes,
        status: req.body.status,
        score: req.body.score,
        time,
      })
        .then((animeEntry) => {
          return res.json({ success: true, animeEntry });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      AnimeEntry.updateOne(
        { user: req.user, anime: req.params.animeId },
        {
          user: req.user,
          anime: req.params.animeId,
          episodes: req.body.episodes,
          score: req.body.score,
          status: req.body.status,
          time,
        }
      )
        .then((animeEntry) => {
          return res.json({ success: true, status: "Anime entry updated." });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
];

exports.deleteEntry = (req, res, next) => {
  if (req.animeEntryExists) {
    AnimeEntry.deleteOne({
      user: req.user._id,
      anime: req.params.animeId,
    })
      .then((animeEntry) => {
        return res.json({ success: true, status: "Anime entry deleted." });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    return res
      .status(400)
      .json({ success: false, status: "Anime entry does not exist" });
  }
};

exports.favoriteAnime = async (req, res, next) => {
  if (!req.animeFavorited) {
    const count = await Favorite.countDocuments({
      user: req.user._id,
      anime: { $ne: null },
    })
      .then((count) => {
        return count;
      })
      .catch((err) => {
        console.log(err);
      });

    if (count <= 10) {
      Favorite.create({ user: req.user._id, anime: req.params.animeId })
        .then((favorite) => {
          return res.json({ success: true, message: "Anime favorited." });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return res.json({
        success: false,
        message: "You can't have more than 10 anime favorited.",
      });
    }
  } else {
    return res.json({ success: false, message: "Anime already favorited." });
  }
};

exports.removeFavoriteAnime = (req, res) => {
  if (req.animeFavorited) {
    Favorite.deleteOne({ user: req.user._id, anime: req.params.animeId })
      .then(() => {
        return res.json({
          success: true,
          status: "Anime removed from favorites.",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    return res.json({ success: false, status: "Anime isn't favorited." });
  }
};

exports.getEpisodeList = (req, res) => {
  Episode.aggregate([
    {
      $match: { anime: req.params.animeId }
    },
    {
      $sort: { chapterNumber: 1 }
    }
  ]).then((episodes) => {
    return res.status({ success: true, episodes });
  }).catch((err) => {
    console.log(err);
  })
};

