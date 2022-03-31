import Game from '../Models/Game.js';

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
      userId: "1842641",
      text: "I love jumping on mushrooms",
      ratingStars: 4.1
    }
  });
  await mario.save();

  let zelda = new Game({
    averagerating: 4.7,
    description: "When you realize the main character's name isn't Zelda",
    imageurl: "Zelda img",
    name: "Zelda",
    platform: "DS",
    releasedate: "1986-02-21",
    reviews: {
      userId: "1842614",
      text: "Sick puzzle game",
      ratingStars: 4.7
    }
  });
  await zelda.save();

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
        userId: "1842614",
        text: "Sick puzzle game",
        ratingStars: 4.7
      }
    })
    await expect(game.name).toEqual("Zelda")
  })