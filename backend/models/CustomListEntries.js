const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomListEntrySchema = new Schema({
    customList: {
        type: Schema.Types.ObjectId,
        ref: "CustomList",
        required: true
    },
    description: { type: String },
    anime: { type: Schema.Types.ObjectId, ref: "Anime" },
    manga: { type: Schema.Types.ObjectId, ref: "Manga" },
});

module.exports = mongoose.model("CustomListEntry", CustomListEntrySchema);
