import Game from '../Models/Game.js';

import db from './db';
beforeAll(async () => {
  await db.connect();
})
beforeEach(async () => {
  let testGame = new Game({ name: "Halo Mario" });
  await testGame.save();

  let testGame2 = new Game({ name: "Zelda" });
  await testGame2.save();
})
afterEach(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())



test('First test', async () => {
  let game = await Game.findOne({ name: "Halo Mario" })
  await expect(game.name).toEqual("Halo Mario")
})

test('Second test', async () => {
  let game = await Game.findOne({ name: "Zelda" })
  await expect(game.name).toEqual("Zelda")
})