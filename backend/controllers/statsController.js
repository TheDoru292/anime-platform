const AnimeEntry = require('../models/AnimeEntry');
const MangaEntry = require('../models/MangaEntry');

exports.getAnimeStats = (req, res, next) => {
    const stats = AnimeEntry.aggregate([
        {
            $match: { anime: req.params.animeId }
        },
        {
            $facet: {
                'watching': [
                    { $match: { "status": {$eq: "Watching"} } },
                    { $count: "count" }
                ],
                'completed': [
                    { $match: { 'status': { $eq: "Completed" } } },
                    { $count: "count" }
                ],
                'onHold': [
                    { $match: { 'status': { $eq: "On-Hold" } } },
                    { $count: "count" }
                ],
                'dropped': [
                    { $match: { 'status': { $eq: "Dropped" } } },
                    { $count: "count" }
                ],
                'planToWatch': [
                    { $match: { 'status': { $eq: 'Plan To Watch' } } },
                    { $count: "count" }
                ],
                'oneRating': [
                    { $match: { 'rating': { $eq: 1 } } },
                    { $count: "count" }
                ],
                'twoRating': [
                    { $match: { 'rating': { $eq: 2 } } },
                    { $count: "count" }
                ],
                'threeRating': [
                    { $match: { 'rating': { $eq: 3 } } },
                    { $count: "count" }
                ],
                'fourRating': [
                    { $match: { 'rating': { $eq: 4 } } },
                    { $count: "count" }
                ],
                'fiveRating': [
                    { $match: { 'rating': { $eq: 5 } } },
                    { $count: "count" }
                ],
                'sixRating': [
                    { $match: { 'rating': { $eq: 6 } } },
                    { $count: "count" }
                ],
                'sevenRating': [
                    { $match: { 'rating': { $eq: 7 } } },
                    { $count: "count" }
                ],
                'eightRating': [
                    { $match: { 'rating': { $eq: 8 } } },
                    { $count: "count" }
                ],
                'nineRating': [
                    { $match: { 'rating': { $eq: 9 } } },
                    { $count: "count" }
                ],
                'tenRating': [
                    { $match: { 'rating': { $eq: 10 } } },
                    { $count: "count" }
                ],
            },
        },
        {
            $project: {
                "watching": {$arrayElemAt: ["$watching.count", 0]},
                "completed": {$arrayElemAt: ["$completed.count", 0]},
                "onHold": {$arrayElemAt: ["$onHold.count", 0]},
                "dropped": {$arrayElemAt: ["$dropped.count", 0]},
                "planToWatch": {$arrayElemAt: ["$planToWatch.count", 0]},
                "oneRating": {$arrayElemAt: ["$oneRating.count", 0]},
                "twoRating": {$arrayElemAt: ["$twoRating.count", 0]},
                "threeRating": {$arrayElemAt: ["$threeRating.count", 0]},
                "fourRating": {$arrayElemAt: ["$fourRating.count", 0]},
                "fiveRating": {$arrayElemAt: ["$fiveRating.count", 0]},
                "sixRating": {$arrayElemAt: ["$sixRating.count", 0]},
                "sevenRating": {$arrayElemAt: ["$sevenRating.count", 0]},
                "eightRating": {$arrayElemAt: ["$eightRating.count", 0]},
                "nineRating": {$arrayElemAt: ["$nineRating.count", 0]},
                "tenRating": {$arrayElemAt: ["$tenRating.count", 0]},
            }
        }
    ]);

    return res.json({ success: true, stats })
};

exports.getMangaStats = (req, res, next) => {
    const stats = MangaEntry.aggregate([
        {
            $match: { manga: req.params.mangaId }
        },
        {
            $facet: {
                'reading': [
                    { $match: { "status": {$eq: "Watching"} } },
                    { $count: "count" }
                ],
                'completed': [
                    { $match: { 'status': { $eq: "Completed" } } },
                    { $count: "count" }
                ],
                'onHold': [
                    { $match: { 'status': { $eq: "On-Hold" } } },
                    { $count: "count" }
                ],
                'dropped': [
                    { $match: { 'status': { $eq: "Dropped" } } },
                    { $count: "count" }
                ],
                'planToRead': [
                    { $match: { 'status': { $eq: 'Plan To Watch' } } },
                    { $count: "count" }
                ],
                'oneRating': [
                    { $match: { 'rating': { $eq: 1 } } },
                    { $count: "count" }
                ],
                'twoRating': [
                    { $match: { 'rating': { $eq: 2 } } },
                    { $count: "count" }
                ],
                'threeRating': [
                    { $match: { 'rating': { $eq: 3 } } },
                    { $count: "count" }
                ],
                'fourRating': [
                    { $match: { 'rating': { $eq: 4 } } },
                    { $count: "count" }
                ],
                'fiveRating': [
                    { $match: { 'rating': { $eq: 5 } } },
                    { $count: "count" }
                ],
                'sixRating': [
                    { $match: { 'rating': { $eq: 6 } } },
                    { $count: "count" }
                ],
                'sevenRating': [
                    { $match: { 'rating': { $eq: 7 } } },
                    { $count: "count" }
                ],
                'eightRating': [
                    { $match: { 'rating': { $eq: 8 } } },
                    { $count: "count" }
                ],
                'nineRating': [
                    { $match: { 'rating': { $eq: 9 } } },
                    { $count: "count" }
                ],
                'tenRating': [
                    { $match: { 'rating': { $eq: 10 } } },
                    { $count: "count" }
                ],
            }
        },
        {
            $project: {
                "watching": {$arrayElemAt: ["$watching.count", 0]},
                "completed": {$arrayElemAt: ["$completed.count", 0]},
                "onHold": {$arrayElemAt: ["$onHold.count", 0]},
                "dropped": {$arrayElemAt: ["$dropped.count", 0]},
                "planToWatch": {$arrayElemAt: ["$planToWatch.count", 0]},
                "oneRating": {$arrayElemAt: ["$oneRating.count", 0]},
                "twoRating": {$arrayElemAt: ["$twoRating.count", 0]},
                "threeRating": {$arrayElemAt: ["$threeRating.count", 0]},
                "fourRating": {$arrayElemAt: ["$fourRating.count", 0]},
                "fiveRating": {$arrayElemAt: ["$fiveRating.count", 0]},
                "sixRating": {$arrayElemAt: ["$sixRating.count", 0]},
                "sevenRating": {$arrayElemAt: ["$sevenRating.count", 0]},
                "eightRating": {$arrayElemAt: ["$eightRating.count", 0]},
                "nineRating": {$arrayElemAt: ["$nineRating.count", 0]},
                "tenRating": {$arrayElemAt: ["$tenRating.count", 0]},
            }
        }
    ]);

    return res.json({ success: true, stats })
};
