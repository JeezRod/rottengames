const Schema = mongoose.Schema;
import mongoose from "mongoose";

const gameSchema = new Schema({
    averagerating: Number,
    description: String,
    imageurl: String,
    name: String,
    platform: Array,
    releasedate: String,
    reviews: {
        userId: String,
        text: String,
        ratingStars: Number
    }
});

const Game = mongoose.model('Game', gameSchema)

// module.exports = Game;
export default Game;

