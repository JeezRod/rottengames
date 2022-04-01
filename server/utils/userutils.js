import User from "../Models/user.js";
import Game from "../Models/Game.js";


export default async function getAll(page, size, name){
 //Set default value for page
 if (!page) {
    page = 1;
  }
  //Set default value for users per page
  if (!size) {
    size = 8;
  }
  //Set default value for name
  if (!name) {
    name = "";
  }

  //Computes the number to skip (page number)
  const limit = parseInt(size);
  const skip = (page - 1) * size;

  //Get all games that match the filter
  const result = await User.find({
    name: {
      "$regex": name,
      "$options": "i"
    }
  })
    .limit(limit)
    .skip(skip);

  return result;
}

export async function getCount(name){
      //Set default value for name
  if (!name) {
    name = "";
  }

  //Gets the count of a filtered name
  const result = await User.find({
    name: {
      "$regex": name,
      "$options": "i"
    }
  }).count();
  return result;
}

export async function getUser(userId){
    return await User.findOne({ _id: userId});
}

export async function getAllReviewsForUser(userId){
    return await Game.find({ "reviews.userId": userId });
}