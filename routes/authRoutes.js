const express = require("express");
const authController = require("../controllers/authController");
const authRouter = express.Router();

authRouter.post("/tokens", authController.tokens);

module.exports = authRouter;
