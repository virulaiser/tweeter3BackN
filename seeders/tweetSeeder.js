/**
 * El seeder no es más que un archivo que contiene una función que se encarga
 * de insertar datos (generalmente de prueba) en una base de datos.
 *
 * El nombre "seeder" es una convención y significa "semillero".
 *
 * Además, en este caso, se está usando una librería llamada Faker
 * (https://fakerjs.dev/) para facilitar la creación de datos ficticios como
 * nombres, apellidos, títulos, direcciones y demás textos.
 *
 * Suele ser común que en los seeders exista un `for` donde se define la
 * cantidad de registros de prueba que se insertarán en la base de datos.
 *
 */

const { faker } = require("@faker-js/faker");
const User = require("../models/User");
const Tweet = require("../models/Tweet");
const { Mongoose } = require("mongoose");
const db = require("../dbInitialSetup");

module.exports = async function tweetSeed() {
  //await db.mongoose.connection.dropCollection("tweets");

  const tweets = [];

  for (let i = 0; i < 100; i++) {
    const randomNumber = faker.datatype.number({ min: 0, max: 19 });
    const randomUser = await User.findOne().skip(randomNumber);

    const tweet = new Tweet({
      content: faker.lorem.paragraph(),
      autor: randomUser._id,
      likes: [],
    });

    tweets.push(tweet);
    randomUser.tweets.push(tweet._id);
    await randomUser.save();
  }

  await Tweet.insertMany(tweets);

  console.log("[Database] Se corrió el seeder de Tweets.");
};
