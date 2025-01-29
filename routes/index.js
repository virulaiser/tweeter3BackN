const tweetRoutes = require("./tweetRoutes");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");

function routes(app) {
  app.use("/tweets", tweetRoutes);
  app.use(authRoutes);
  app.use("/user", userRoutes);
}

module.exports = routes;
