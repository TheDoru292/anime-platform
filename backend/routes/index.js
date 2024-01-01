const express = require("express");
const router = express.Router();
require("dotenv").config();
require("../passport");

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_LINK);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const authRouter = require("./auth");
const animeTypeRouter = require("./animetype");
const animeGenreRouter = require("./animegenre");
const animeThemeRouter = require("./animetheme");
const animeRouter = require("./anime");

router.use("/auth", authRouter);

router.use("/anime", animeRouter);

router.use("/anime-type", animeTypeRouter);

router.use("/anime-genre", animeGenreRouter);

router.use("/anime-theme", animeThemeRouter);

module.exports = router;
