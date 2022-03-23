const Schema = mongoose.Schema;
import mongoose from "mongoose";

const userSchema = new Schema({
    email: String,
    name: String,
    bio: {type: String, default: "No bio."},
    picture: String,
    admin: Boolean,
}, { versionKey: false });

const User = mongoose.model('User', userSchema)

// module.exports = User;
export default User;
