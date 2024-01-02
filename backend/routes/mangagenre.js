const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const Genre = require("../models/MangaGenre");

router.post("/new", [
  body("name").trim().escape().isLength({ min: 1 }),
  body("description").trim().escape().isLength({ min: 1 }),

  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    Genre.create({ name: req.body.name, description: req.body.description })
      .then((genre) => {
        return res.json({ success: true, genre });
      })
      .catch((err) => {
        console.log(err);
      });
  },
]);

router.delete("/:genreName", (req, res) => {
  Genre.deleteOne({ name: req.params.genreName })
    .then(() => {
      return res.status(200).json({ success: true, message: "Genre deleted." });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
