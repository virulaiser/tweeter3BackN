const { mongoose } = require("../dbInitialSetup");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    bio: { type: String },
    avatar: { type: String },
    tweets: [{ type: Schema.Types.ObjectId, ref: "Tweet" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", { virtuals: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
