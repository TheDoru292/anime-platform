const Type = require("../models/AnimeType");
const Genre = require("../models/AnimeGenre");
const Theme = require("../models/AnimeTheme");
const Anime = require("../models/Anime");

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
