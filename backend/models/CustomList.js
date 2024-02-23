const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomListSchema = new Schema({
    name: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: { type: String, required: true },
    description: { type: String, required: true },
    createdOn: { type: Date, required: true, default: new Date() },
    updatedOn: { type: Date }
});

module.exports = mongoose.model("CustomList", CustomListSchema);
