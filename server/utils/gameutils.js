import Game from "../Models/Game.js";

export async function getAll(page, size, name, platform){
  //Set default value for page
  if (!page) {
    page = 1;
  }
  //Set default value for games per page
  if (!size) {
    size = 32;
  }
  //Set default value for name
  if (!name) {
    name = "";
  }
  //Set default value for platform if none is checked
  if (!platform) {
    platform = "";
  }

  //Computes the number to skip (page number)
  const limit = parseInt(size);
  const skip = (page - 1) * size;
  let result = null;

  if (platform === "") {
    result = await Game.find({
      name: {
        "$regex": name,
        "$options": "i"
      }
    })
      .limit(limit)
      .skip(skip);
  }
  else {
    //Gets the count of a filtered name
    result = await Game.find({
      name: {
        "$regex": name,
        "$options": "i"
      },
      platform: {
        "$in": platform
      }
    })
      .limit(limit)
      .skip(skip);
  }
  return result;
}

export async function getCount(name, platform){
  //Set default value for name
  if (!name) {
    name = "";
  }

  if (!platform) {
    platform = "";
  }

  let result = null;

  if (platform === "") {
    result = await Game.find({
      name: {
        "$regex": name,
        "$options": "i"
      }
    }).count();
  }
  else {
    //Gets the count of a filtered name
    result = await Game.find({
      name: {
        "$regex": name,
        "$options": "i"
      },
      platform: {
        "$in": platform
      }
    }).count();
  }
  return result;
}

//Game model does not have _id so this is not tested but its here
// export async function getGameId(gameId){
//   let result = await Game.findById(gameId);
//   return result;
// }


// export async function insertOneGame(game){

// }