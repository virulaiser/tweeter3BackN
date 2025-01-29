const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");

userRouter.get(
  "/",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  userController.index
);

userRouter.get(
  "/:username",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  userController.show
);

userRouter.post("/", userController.newUser);

userRouter.delete(
  "/",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  userController.removeUser
);

userRouter.patch(
  "/:id",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  userController.updateUser
);

userRouter.post(
  "/follower",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  userController.follower
);

module.exports = userRouter;
