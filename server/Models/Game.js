const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    averagerating: Number,
    description: String,
    imageurl: String,
    name: String,
    platform: String,
    releasedate: String,
    reviews: {
        user: String,
        comment: String,
        rate: Number
    }
});

const Game = mongoose.model('Game', gameSchema)

module.exports = Game;

