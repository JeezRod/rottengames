import User from '../Models/user.js'

import db from './db';
beforeAll(async () => {
  await db.connect();
})

beforeEach(async () => {

  let alice = new User({
    email: "alice@gmail.com",
    name: "Alice",
    bio: "Gamer girl that loves Mario games",
    picture: "Alice pfp",
    admin: true
  });
  await alice.save();

  let bob = new User({
    email: "bob@gmail.com",
    name: "Bob",
    bio: "Gamer boy that loves Zelda games",
    picture: "Bob pfp",
    admin: false
  });
  await bob.save();

})

afterEach(async () => await db.clearDatabase())

afterAll(async () => await db.closeDatabase())


test('Retrieve user by email', async () => {
  let user = await User.findOne({
    email: "alice@gmail.com"
  })
  await expect(user.name).toEqual("Alice")
})
