const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const Type = require("../models/AnimeType");

router.post("/new", [
  body("name").isLength({ min: 1 }).escape(),

  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ succes: false, errors: errors.array() });
    }

    Type.create({ name: req.body.name })
      .then((type) => {
        return res.status(200).json({ success: true, type });
      })
      .catch((err) => {
        console.log(err);
      });
  },
]);

router.delete("/:typeName", (req, res) => {
  Type.deleteOne({ name: req.params.typeName })
    .then(() => {
      return res.status(200).json({ success: true, message: "Type deleted." });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
