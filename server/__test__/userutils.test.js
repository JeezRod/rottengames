import User from '../Models/user.js'
import { getAll } from '../utils/userutils.js';

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

  let darick = new User({
    email: "darick@gmail.com",
    name: "Darick",
    bio: "Gamer boy that loves puzzle games",
    picture: "Darick pfp",
    admin: false
  });
  await darick.save();

})

afterEach(async () => await db.clearDatabase())

afterAll(async () => await db.closeDatabase())

//Test User Utils

test('Test getAll', async () => {
    let results = await getAll(1,4,"")
    let expectedResults = ["Alice", "Bob", "Carrot", "Darick"]
    //Looping through all the results
    for (let i = 0 ; i < expectedResults.length ; i++){
      await expect(results[i].name).toEqual(expectedResults[i])
    }
})

test('Test getAll', async () => {
    let results = await getAll(1,4,"")
    let expectedResults = ["Alice", "Bob", "Carrot", "Darick"]
    //Looping through all the results
    for (let i = 0 ; i < expectedResults.length ; i++){
      await expect(results[i].name).toEqual(expectedResults[i])
    }
})

test('Test getAll size', async () => {
    let results = await getAll(1,3,"")
    let expectedResult = 3
    await expect(results.length).toEqual(expectedResult)
})


test('Test getAll name', async () => {
    let results = await getAll(1,4,"Ali")
    let expectedResult = ["Alice"]
    //Looping through all the results (only have 1 result)
    for (let i = 0 ; i < expectedResult.length ; i++){
      await expect(results[i].name).toEqual(expectedResult[i])
    }
})

/**
 * The rest of the functions in user utils require the userId.
 * Since there is no _id field in the model and is automatically generated
 * we can't add it to our sample model and test it
*/


