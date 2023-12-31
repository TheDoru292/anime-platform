const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const Theme = require("../models/AnimeTheme");

router.post("/new", [
  body("name").isLength({ min: 1 }).escape(),

  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ succes: false, errors: errors.array() });
    }

    Theme.create({ name: req.body.name })
      .then((type) => {
        return res.status(200).json({ success: true, type });
      })
      .catch((err) => {
        console.log(err);
      });
  },
]);

router.delete("/:themeName", (req, res) => {
  Theme.deleteOne({ name: req.params.themeName })
    .then(() => {
      return res.status(200).json({ success: true, message: "Theme deleted." });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
