// Find solution on how to reorder in case of edit/delete
const Chapter = require('../models/Chapter');
const Episode = require('../models/Episode');
const { validationResult, body } = require('express-validator');

exports.addChapter = [
    body('engTitle').isLength({ min: 1 }),
    body('originalTitle').isLength({ min: 1 }),
    body('chapterNumber').isInt({ min: 1 }),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const obj = {
            manga: req.params.mangaId,
            engTitle: req.params.engTitle,
            originalTitle: req.params.originalTitle,
            chapterNumber: req.params.chapterNumber,
            thread: null,
        }

        Chapter.create(obj)
            .then((chapter) => {
                return res.status(200).json({ success: true, chapter })
            })
            .catch((err) => {
                next(err);
            });
    },
]

exports.deleteChapter = (req, res) => {
    Chapter.deleteOne({ 
        manga: req.params.mangaId,
        chapterNumber: req.params.chapterNumber
    })
        .then(() => {
            return res.status(200).json({ success: true, status: 'Chapter deleted' });
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.editChapter = [
    body('engTitle').isLength({ min: 1 }),
    body('originalTitle').isLength({ min: 1 }),
    body('chapterNumber').isInt({ min: 1 }),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const obj = {
            manga: req.params.mangaId,
            engTitle: req.params.engTitle,
            originalTitle: req.params.originalTitle,
            chapterNumber: req.params.chapterNumber,
        }

        Chapter.edit({ _id: req.params.mangaId, chapterNumber: req.params.chapterNumber }, obj)
            .then((chapter) => {
                return res.status(200).json({ success: true, chapter })
            })
            .catch((err) => {
                next(err);
            });
    },
]

exports.createEpisode = [
    body('engTitle').isLength({ min: 1 }),
    body('originalTitle').isLength({ min: 1 }),
    body('episodeNumber').isInt({ min: 1 }),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const obj = {
            anime: req.params.animeId,
            engTitle: req.params.engTitle,
            originalTitle: req.params.originalTitle,
            episodeNumber: req.params.episodeNumber,
            thread: null,
        }

        Episode.create(obj)
            .then((episode) => {
                return res.status(200).json({ success: true, episode })
            })
            .catch((err) => {
                next(err);
            });
    }
];

exports.editEpisode = [
    body('engTitle').isLength({ min: 1 }),
    body('originalTitle').isLength({ min: 1 }),
    body('episodeNumber').isInt({ min: 1 }),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const obj = {
            anime: req.params.animeId,
            engTitle: req.params.engTitle,
            originalTitle: req.params.originalTitle,
            episodeNumber: req.params.episodeNumber,
        }

        Episode.edit({ _id: req.params.mangaId, episodeNumber: req.params.episodeNumber }, obj)
            .then((episode) => {
                return res.status(200).json({ success: true, episode })
            })
            .catch((err) => {
                next(err);
            });
    },
]
