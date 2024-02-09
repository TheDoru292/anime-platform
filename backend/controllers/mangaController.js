const { body, validationResult } = require("express-validator");

const Manga = require("../models/Manga");
const MangaEntry = require('../models/MangaEntry');

exports.create = [
  body("title").trim().isLength({ min: 1 }).escape(),
  body("cover").trim(),
  body("status").trim().isLength({ min: 1 }).escape(),
  body("serialization").trim().escape(),
  body("synopsys").trim().escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    let mangaObj = {
      title: req.body.title,
      cover: req.body.cover || "",
      type: req.body.type,
      genres: req.body.genres || [],
      themes: req.body.themes || [],
      status: req.body.status,
      serialization: req.body.serialization,
      synopsys: req.body.synopsys,
      volumes: req.body.volumes,
      chapters: req.body.chapters,
      alternativeTitles: req.body.alternativeTitles || {},
      publishedDate: req.body.publishedDate || {},
      relations: req.body.relations || {},
    };

    Manga.create(mangaObj)
      .then((manga) => {
        return res.json({ success: true, manga });
      })
      .catch((err) => {
        console.log(err);
      });
  },
];

exports.delete = (req, res) => {
  Manga.deleteOne({ _id: req.params.mangaId })
    .then((manga) => {
      return res.json({ success: true, status: "Manga deleted." });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.get = (req, res) => {
  Manga.findOne({ _id: req.params.mangaId })
    .then((manga) => {
      return res.json({ success: true, manga });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.edit = [
  body("title").trim().isLength({ min: 1 }).escape(),
  body("cover").trim(),
  body("status").trim().isLength({ min: 1 }).escape(),
  body("serialization").trim().escape(),
  body("synopsys").trim().escape(),

  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    let mangaObj = {
      title: req.body.title,
      cover: req.body.cover || "",
      type: req.body.type,
      genres: req.body.genres || [],
      themes: req.body.themes || [],
      status: req.body.status,
      serialization: req.body.serialization,
      synopsys: req.body.synopsys,
      volumes: req.body.volumes,
      chapters: req.body.chapters,
      alternativeTitles: req.body.alternativeTitles || {},
      publishedDate: req.body.publishedDate || {},
      relations: req.body.relations || {},
    };

    Manga.edit({ _id: req.params.mangaId }, mangaObj)
      .then((manga) => {
        return res.json({ success: true, manga });
      })
      .catch((err) => {
        console.log(err);
      });
  }
];

exports.addEntry = [
  async (req, res) => {
    const manga = await Manga.findOne({ _id: req.params.mangaId })
      .then((manga) => {
        return manga;
      })
      .catch((err) => console.log(err));

    if (req.body.chapters > manga.chapters || req.body.chapters < 0) {
      return res.json({
        success: false,
        messages: "Please check the chapters count.",
      });
    }

    if (req.body.score > 10 || req.body.score < 0) {
      return res.json({ success: false, messages: "Please check the score." });
    }

    if (req.body.status == "Completed") {
      req.body.chapters = manga.chapters;
    }

    const time = req.body.chapters * 4; // 4 minutes per chapter, value might change

    const obj = {
      user: req.user,
      manga: req.params.mangaId,
      chapters: req.body.chapters,
      status: req.body.status,
      score: req.body.score,
      time,
    }

    if (!req.mangaEntryExists) {
      MangaEntry.create(obj)
        .then((mangaEntry) => {
          return res.json({ success: true, mangaEntry });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      MangaEntry.updateOne(
        { user: req.user, manga: req.params.mangaId },
        obj
      )
        .then((mangaEntry) => {
          return res.json({ success: true, status: "Manga entry updated." });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
];

exports.deleteEntry = (req, res) => {
  if (req.mangaEntryExists) {
    MangaEntry.deleteOne({
      user: req.user._id,
      manga: req.params.mangaId,
    })
      .then((animeEntry) => {
        return res.json({ success: true, status: "Manga entry deleted." });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    return res
      .status(400)
      .json({ success: false, status: "Manga entry does not exist" });
  }
}

exports.favorite = async (req, res, next) => {
  if (!req.mangaFavorited) {
    const count = await Favorite.countDocuments({
      user: req.user._id,
      manga: { $ne: null },
    })
      .then((count) => {
        return count;
      })
      .catch((err) => {
        console.log(err);
      });

    if (count <= 10) {
      Favorite.create({ user: req.user._id, manga: req.params.mangaId })
        .then((favorite) => {
          return res.json({ success: true, message: "Manga favorited." });
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
    return res.json({ success: false, message: "Manga already favorited." });
  }
};

exports.remoteFavorite = (req, res) => {
  if (req.mangaFavorited) {
    Favorite.deleteOne({ user: req.user._id, manga: req.params.mangaId })
      .then(() => {
        return res.json({
          success: true,
          status: "Manga removed from favorites.",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    return res.json({ success: false, status: "Manga isn't favorited." });
  }
};
