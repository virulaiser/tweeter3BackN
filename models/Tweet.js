const { mongoose } = require("../dbInitialSetup");
const Schema = mongoose.Schema;

const tweetSchema = new Schema(
  {
    content: { type: String, required: true },
    autor: { type: Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    contTweet: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Tweet = mongoose.model("Tweet", tweetSchema);
tweetSchema.set("toJSON", { virtuals: true });

module.exports = Tweet;
