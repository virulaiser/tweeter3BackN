const express = require("express");
const tweetRouter = express.Router();
const tweetController = require("../controllers/tweetController");
const { expressjwt: checkJwt } = require("express-jwt");

tweetRouter.get(
  "/Twee",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  tweetController.selectTweet
);

tweetRouter.get(
  "/:username",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  tweetController.index
);
tweetRouter.get(
  "/homeFollowing/:username",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  tweetController.indexFollowing
);

tweetRouter.post(
  "/",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  tweetController.insertTweets
);

tweetRouter.post(
  "/like",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  tweetController.like
);

tweetRouter.patch(
  "/:id",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  tweetController.updateTweets
);

tweetRouter.delete(
  "/",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  tweetController.removeTweets
);

module.exports = tweetRouter;
