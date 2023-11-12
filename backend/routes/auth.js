const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.json({ success: false, error: "Bad input." });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }

      const userObj = {
        _id: user._id,
        username: user.username,
        profile_picture_url: user.profile_picture_url,
      };

      jwt.sign({ _id: user._id }, process.env.JWT_SECRET, (err, token) => {
        if (err) {
          return res.json({ success: false });
        }

        return res.json({ success: true, user: userObj, token });
      });
    });
  })(req, res);
});

router.post("/register", [
  body("username").isLength({ min: 3, max: 255 }).trim().escape(),
  body(
    "password",
    "Password should be at least 8 characters long and must contain at least 1 number, 1 uppercase letter and a symbol."
  ).isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }),
  body("email").isEmail(),
  body("profile_picture").isString().trim(),
  body("date_of_birth").isISO8601(),

  (req, res, next) => {
    console.log("hi");

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ success: false, error: errors.array() });
    }

    const userObj = {
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      dateOfBirth: req.body.date_of_birth,
      profilePicture: req.body.profilePicture || "",
      roles: ["ROLE_USER"],
    };

    User.create(userObj)
      .then((user) => {
        const returnObj = {
          _id: user._id,
          username: user.username,
          profilePicture: user.profilePicture,
        };

        jwt.sign({ _id: user._id }, process.env.JWT_SECRET, (err, token) => {
          if (err) {
            return res
              .status(500)
              .json({ success: false, status: "Internal server error" });
          }

          return res
            .status(200)
            .json({ success: true, user: returnObj, token });
        });
      })
      .catch((err) => {
        return res
          .status(500)
          .json({ success: false, stauts: "internal server error" });
      });
  },
]);

module.exports = router;
