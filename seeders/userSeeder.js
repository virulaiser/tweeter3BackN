const User = require("../models/User");
const { faker } = require("@faker-js/faker");
const mongoose = require("../dbInitialSetup");

module.exports = async () => {
  // await mongoose.connection.dropCollection("users");

  const users = [];
  const userPassword = "1234";

  for (let i = 0; i < 20; i++) {
    const user = new User({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      username: faker.internet.userName(),
      password: userPassword,
      email: faker.internet.email(),
      avatar:
        "https://i1.sndcdn.com/avatars-000482795607-8hrf8t-t1080x1080.jpg",
      bio: faker.lorem.paragraph(),
      tweets: [],
      followers: [],
      following: [],
    });
    users.push(user);
  }

  for (const user of users) {
    for (let i = 0; i < 10; i++) {
      const randomNumber = faker.datatype.number({
        min: 0,
        max: users.length - 1,
      });
      const randomUser = users[randomNumber];
      if (String(randomUser._id) !== String(user._id)) {
        if (
          !user.following.some((u) => String(u._id) === String(randomUser._id))
        ) {
          user.following.push(randomUser);
          randomUser.followers.push(user);
        }
      }
    }
  }
  await User.insertMany(users);
  console.log("Seeder de Usuarios completado");
};
