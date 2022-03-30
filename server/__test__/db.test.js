import Game from '../Models/Game.js';


import db from './db';
beforeAll(async () => await db.connect())
afterEach(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())



test('First test', async () => {

  let testGame = new Game({ name: "Halo Mario" });
  await testGame.save();

  let game = await Game.findOne({ name: "Halo Mario" })

  await expect(game.name).toEqual("Halo Mario")
})