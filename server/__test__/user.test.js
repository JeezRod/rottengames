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

  let carrot = new User({
    email: "carrot@gmail.com",
    name: "Carrot",
    bio: "Gamer girl that loves shooting games",
    picture: "Carrot pfp",
    admin: true
  });
  await carrot.save();

})

afterEach(async () => await db.clearDatabase())

afterAll(async () => await db.closeDatabase())


test('Retrieve user by email', async () => {
  let user = await User.findOne({
    email: "alice@gmail.com"
  })
  await expect(user.name).toEqual("Alice")
})

test('Retrieve user by name', async () => {
  let user = await User.findOne({
    name: "Alice"
  })
  await expect(user.name).toEqual("Alice")
})

test('Retrieve user by admin', async () => {
  let user = await User.findOne({
    admin: true
  })
  await expect(user.name).toEqual("Alice")
})

test('Retrieve user by bio', async () => {
  let user = await User.findOne({
    bio: "Gamer boy that loves Zelda games"
  })
  await expect(user.name).toEqual("Bob")
})

test('Retrieve user by picture', async () => {
  let user = await User.findOne({
    picture: "Bob pfp"
  })
  await expect(user.name).toEqual("Bob")
})

test('Retrieve multiple users by admin', async () => {
  let user = await User.find({
    admin: true
  })
  await expect(user[0].name).toEqual("Alice")
  await expect(user[1].name).toEqual("Carrot")
})
