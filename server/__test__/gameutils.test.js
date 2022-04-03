import Game from '../Models/Game.js';
import {getAll} from '../utils/gameutils.js'
import {getCount} from '../utils/gameutils.js'

import db from './db';
beforeAll(async () => {
  await db.connect();
})

beforeEach(async () => {
  let mario = new Game({
    averagerating: 4.1,
    description: "Short Italian plumber who resides in the Mushroom Kingdom and collects coins",
    imageurl: "Mario img",
    name: "Mario",
    platform: "Wii",
    releasedate: "1982-07-14",
    reviews: {
      userId: "1842614",
      text: "I love jumping on mushrooms",
      ratingStars: 4.1
    }
  });
  await mario.save();

  let pokemon = new Game({
    averagerating: 4.5,
    description: "Catch them all to be the best",
    imageurl: "Pokemon img",
    name: "Pokemon",
    platform: "Wii",
    releasedate: "1996-02-27",
    reviews: {
      userId: "1842640",
      text: "I wanna be the best",
      ratingStars: 4.5
    }
  });
  await pokemon.save();

  let zelda = new Game({
    averagerating: 4.7,
    description: "When you realize the main character's name isn't Zelda",
    imageurl: "Zelda img",
    name: "Zelda",
    platform: "DS",
    releasedate: "1986-02-21",
    reviews: {
      userId: "1842613",
      text: "Sick puzzle game",
      ratingStars: 4.7
    }
  });
  await zelda.save();

  let zelda2 = new Game({
    averagerating: 4.7,
    description: "When you realize the main character's name isn't Zelda",
    imageurl: "Zelda2 img",
    name: "Zelda2",
    platform: "DS",
    releasedate: "1986-02-21",
    reviews: {
      userId: "1842613",
      text: "Sick puzzle game also",
      ratingStars: 4.7
    }
  });
  await zelda2.save();

})

afterEach(async () => await db.clearDatabase())

afterAll(async () => await db.closeDatabase())

//Testing Game Utils

test('Test getAll', async () => {
  let results = await getAll(1,4,"","")
  let expectedResults = ["Mario", "Pokemon", "Zelda", "Zelda2"]
  //Looping through all the results
  for (let i = 0 ; i < expectedResults.length ; i++){
    await expect(results[i].name).toEqual(expectedResults[i])
  }

})

test('Test getAll count', async () => {
  let results = await getAll(1,4,"","")
  await expect(results.length).toEqual(4)
})

test('Test getAll name', async () => {
  let results = await getAll(1,2,"zelda","")
  let expectedResults = ["Zelda", "Zelda2"]
  //Looping through all the results
  for (let i = 0 ; i < expectedResults.length ; i++){
    await expect(results[i].name).toEqual(expectedResults[i])
  }
})

test('Test getAll platforms', async () => {
  let results = await getAll(1,2,"","Wii")
  let expectedResults = ["Mario", "Pokemon"]
  //Looping through all the results
  for (let i = 0 ; i < expectedResults.length ; i++){
    await expect(results[i].name).toEqual(expectedResults[i])
  }
})

test('Test getCount count', async () => {
  let results = await getCount("","")
  await expect(results).toEqual(4)
})

test('Test getCount name', async () => {
  let results = await getCount("Zelda", "")
  await expect(results).toEqual(2)
})

test('Test getCount platform', async () => {
  let results = await getCount("", "Wii")
  await expect(results).toEqual(2)
})

// Game model does not have _id, cannot be tested
// test('Test getGameId', async () => {
//   let result = await getGameId("0001")
//   await expect(result).toEqual("Mario")
// })

