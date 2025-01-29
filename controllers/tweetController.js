const Tweet = require("../models/Tweet");
const User = require("../models/User");

const tweetController = {
  index: async (req, res) => {
    console.log(req.params);
    const user = await User.findOne({ username: req.params.username });
    const tweets = await Tweet.find({ autor: user._id })
      .sort([["createdAt", -1]])
      .populate("autor");

    console.log("VA TWEETS");
    return res.json(tweets);
  },

  indexFollowing: async (req, res) => {
    console.log(req.params);
    const user = await User.findOne({ username: req.params.username });
    const tweets = await Tweet.find({ following: user.following })
      .sort([["createdAt", -1]])
      .populate("autor")
      .limit(20);

    console.log("VA TWEETS following");
    return res.json(tweets);
  },
  selectTweet: async (req, res) => {
    //const tweerts = await Tweet.find();
    const auth = req.auth;
    const userDel = await User.findById(auth.sub)
      .populate("tweets")
      .populate("following")
      .populate("followers");

    return res.json({ userDel });
  },

  insertTweets: async (req, res) => {
    const bodyTweer = req.body;
    console.log(bodyTweer);
    const newTweet = await Tweet.insertMany(bodyTweer);
    return res.json({ respuesta: newTweet });
  },

  removeTweets: async (req, res) => {
    console.log("entre al remove");
    const newUser = req.body;
    console.log(newUser);
    const userDel = await Tweet.findById(newUser.id);
    const resp = await Tweet.remove(userDel);
    return res.json({ respuesta: resp });
  },

  updateTweets: async (req, res) => {
    const update = req.body;
    const id = req.params;
    console.log({ id, update });
    const resp = await Tweet.findOneAndUpdate(id, update);

    return res.json({ respuesta: resp });
  },

  like: async (req, res) => {
    const id = req.body.idTweet;
    const resp = await Tweet.updateOne(
      //idTweet es el ID del tweet
      { id },
      {
        $inc: { contTweet: 1 },
        $push: { likes: req.body.idCreador },
      }
      //idUserLike es la persona que da like
    );
    res.json({ respuesta: resp });
  },
};

module.exports = tweetController;
