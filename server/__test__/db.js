const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

import "babel-polyfill";
let mongo;
//connect to db
module.exports.connect = async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  await mongoose.connect(uri, mongooseOpts)
}

//disconnect and close connection
module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
}

//clear the db, remove all data
module.exports.clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
}


module.exports.addGame = async (game) => {
  mongo.save(function (err, game) {
    if (err) { return console.error(err); }
    console.log(game.name + " saved to games collection.");
  });
}