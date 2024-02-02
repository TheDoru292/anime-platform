const moongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewReactionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    review: { type: Schema.Types.ObjectId, ref: "Review", required: true },
    reaction: { type: String, required: true },
});

module.exports = mongoose.model('ReviewReaction', ReviewReactionSchema);
