const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    averagerating: Number,
    description: String,
    imageurl: String,
    name: String,
    platform: Array,
    releasedate: String,
    reviews: {
        userId: String,
        name: String,
        text: String,
        email: String,
        ratingStars: Number
    }
});

const Game = mongoose.model('Game', gameSchema)

module.exports = Game;

