const { body, validationResult } = require('express-validator');
// Reminder to add async as a dependency later
// Reminder to paginate reviews, getUserReviews and getAll functions
const async = require('async');

const AnimeEntry = require('../models/AnimeEntry.js');
const Review = require('../models/Review.js');
const ReviewReaction = require('../models/ReviewReaction.js');

exports.get = async (req, res, next) => {
    const review = await getReview(req.params.reviewId)    

    return res.status(200).json({success: true, review});
}

exports.getAll = (req, res, next) => {
    const reviews = [];

    Review.find(
        {
            anime: req.params.animeId === 'anime' ? req.body.anime : null,
            manga: req.params.mangaId === 'manga' ? req.body.manga : null,
        }
    ).then((review) => {
        async.each(
            review.docs,
            async (review, callback) => {
                const review = await getReview(review._id);

                reviews.push(review);

                callback(null);
            },
            (err) => {
                return res.status(200).json({ success: true, reviews })
            }
        )
    }).catch((err) => {
        console.err(err);
    })
}

exports.getUserReviews = (req, res, next) => {
    const reviews = [];

    Review.find({user: req.user})
        .then((reviews) => {
            async.each(
                review.docs,
                async (review, callback) => {
                    const review = await getReview(review._id);

                    reviews.push(review);

                    callback(null);
                },
                (err) => {
                    return res.status(200).json({ success: true, reviews })
                }
            )
        })
        .catch(err => {
            console.log(err)
        })
}

exports.create = [
    body('review').isLength({ min: 15 }).escape(),
    body('recommended').custom((value) => {
        const array = ['recommended', 'not recommended', 'mixed feelings'];

        if (!array.includes(value)) {
            throw new Error('Recommended value is not valid')
        }
    }),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        if (!req.body.anime && !req.body.manga) {
            return res.status(400).json({ success: false, error: 'Anime or manga not provided' })
        }

        const object = {
            user: req.user,
            anime: null,
            manga: null,
            review: req.body.review,
            recommended: req.body.recommended,
            reviewed_on: new Date(),
        }

        if (req.params.animeId) {
            object.anime = req.body.anime;
        } else {
            object.manga = req.body.manga;
        }

        Review.create(object)
            .then((review) => {
                return res.status(200).json({ success: true, review })
            })
            .catch((err) => {
                console.log(err);
            });
    },
]

exports.edit = [
    body('review').isLength({ min: 15 }).escape(),
    body('recommended').custom((value) => {
        const array = ['recommended', 'not recommended', 'mixed feelings'];

        if (!array.includes(value)) {
            throw new Error('Recommended value is not valid')
        }
    }),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        
        if (!req.reviewOwner) {
            return res.status(400).json({ success: false, status: 'You are not the one who posted the review' })
        }

        Review.updateOne(
            { _id: req.params.reviewId },
            {
                review: req.body.review,
                recommended: req.body.recommended,
            },
            )
            .then((review) => {
                return res.status(200).json({ success: true, review })
            })
            .catch((err) => {
                console.log(err);
            });
    },
]

exports.react = [
    body('reaction').custom((value) => {
        const array = ['nice', 'love', 'funny', 'confusing', 'informative', 'well-written', 'creative'];

        if (!array.includes(value)) {
            throw new Error('Reaction value is not valid');
        }
    }),

    async (req, res, next) => {
        const errors = validationResult(req);
        
        if(!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const newReviewReact = {
            user: req.user,
            review: req.params.reviewId,
            reaction: req.body.reaction
        }

        if (req.reacted === true && req.react.reaction === req.body.reaction) {
            return req.status(400).json({ success: false, error: 'You tried to react with the same reaction' });
        } else if (req.reacted === true) {
        
            const oldReviewReact = await ReviewReaction.removeOne(req.react);

            ReviewReaction.create(newReviewReact)
                .then((reviewReact) => {
                    return res.status(200).json({ success: true, status: 'Reacted' })
                })
                .catch((err) => {
                    next(err);
                })
        } else {
            ReviewReaction.create(newReviewReact)
                .then((reviewReact) => {
                    return res.status(200).json({ success: true, status: 'Reacted' })
                })
                .catch((err) => {
                    next(err);
                })
        }
    }
]

exports.removeReact = (req, res, next) => {
    if (!req.reviewReactOwner) {
        return res.status(400).json({ success: false, status: 'You are not the one who posted the review' })
    }

    ReviewReaction.removeOne({ _id: req.params.reviewId })
        .then((review) => {
            return res.status(200).json({ success: true, status: 'Reaction deleted' })
        })
        .catch((err) => {
            next(err);
        })
}

exports.delete = (req, res, next) => {
    if (!req.reviewOwner) {
        return res.status(400).json({ success: false, status: 'You are not the one who posted the review' })
    }

    Review.deleteOne({ _id: req.params.reviewId })
        .then(() => {
            return res.status(200).json({ success: true, status: 'Review deleted.' })
        })
        .catch((err) => {
            console.log(err)
        });
}

function getReview(reviewId) {
    async.parallel([
        function(callback) {
            Review.findOne({ _id: reviewId })
                .then((review) => {
                    callback(null, review)
                })
                .catch((err) => {
                    callback(err);
                })
        },
        function(review, callback) {
            const obj = {
                user: review.user,
                anime: review.anime,
                manga: review.manga,
            }

            AnimeEntry.findOne(obj, 'episodes score')
                .then((entry) => {
                    const result = {
                        review,
                        entryData: entry
                    }

                    callback(null, result)
                })
                .catch((err) => {
                    callback(err)
                });
        }, (err, result) => {
            if (err) {
                console.err(err);
            }

            return result;
        }
    ]);
}
