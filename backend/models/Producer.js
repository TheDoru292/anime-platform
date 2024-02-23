const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProducerSchema = new Schema({
    englishName: { type: String },
    japaneseName: { type: String },
    description: { type: String },
    established: { type: Date },
    availableAt: [
        {
            type: { type: String },
            website: { type: String }
        }
    ],
})

module.exports = mongoose.model("Producer", ProducerSchema);
