import Game from '../Models/Game.js';
import getAll from '../utils/gameutils.js'

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


test('Retieve game by averagerating', async () => {
  let game = await Game.findOne({
    averagerating: 4.1
  })
  await expect(game.name).toEqual("Mario")
})

test('Retieve game by description', async () => {
  let game = await Game.findOne({
    description: "Short Italian plumber who resides in the Mushroom Kingdom and collects coins"
  })
  await expect(game.name).toEqual("Mario")
})

test('Retieve game by imageurl', async () => {
  let game = await Game.findOne({
    imageurl: "Mario img"
  })
  await expect(game.name).toEqual("Mario")
})

test('Retieve game by name', async () => {
  let game = await Game.findOne({
    name: "Mario"
  })
  await expect(game.name).toEqual("Mario")
})

test('Retrieve game by platform', async () => {
  let game = await Game.findOne({
    platform: "DS",
  })
  await expect(game.name).toEqual("Zelda")
})

test('Retrieve game by releasedate', async () => {
  let game = await Game.findOne({
    releasedate: "1986-02-21",
  })
  await expect(game.name).toEqual("Zelda")
})

test('Retrieve game by reviews', async () => {
  let game = await Game.findOne({
    reviews: {
      userId: "1842613",
      text: "Sick puzzle game",
      ratingStars: 4.7
    }
  })
  await expect(game.name).toEqual("Zelda")
})

test('Retrieve multiple games by platform', async () => {
  let game = await Game.find({
    platform: "Wii",
  })
  await expect(game[0].name).toEqual("Mario")
  await expect(game[1].name).toEqual("Pokemon")
})

test('Retrieve multiple games by exact reviews', async () => {
  let game = await Game.findOne({
    reviews: {
      userId: "1842613",
      text: "Sick puzzle game",
      ratingStars: 4.7
    }
  })
  await expect(game.name).toEqual("Zelda")
})

test('Retrieve multiple games by userId', async () => {
  let game = await Game.find({
    "reviews.userId": "1842613"
  })
  await expect(game[0].name).toEqual("Zelda")
  await expect(game[1].name).toEqual("Zelda2")
})

