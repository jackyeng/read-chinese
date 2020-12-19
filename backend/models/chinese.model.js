const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chineseSchema = new Schema({
    character: { type: String, required: true },
    pinyin: { type: String, required: true},
    meaning: { type: String, required: true},
    rank: { type: Number, required: true },
}, {
    timestamps: true,
});

const Chinese = mongoose.model('Chinese', chineseSchema);

module.exports = Chinese;