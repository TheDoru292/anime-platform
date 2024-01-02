const { body, validationResult } = require("express-validator");

const Manga = require("../models/Manga");

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
