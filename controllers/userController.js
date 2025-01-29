const User = require("../models/User");

const userController = {
  index: async (req, res) => {
    const users = await User.find();
    return res.json(users);
  },

  show: async (req, res) => {
    const user = await User.findOne({ username: req.params.username })
      .populate("tweets")
      .populate("following")
      .populate("followers");
    return res.json(user);
    //console.log(req.params.username);
  },

  newUser: async (req, res) => {
    const newUser = req.body;
    console.log(newUser);
    const resp = await User.insertMany(newUser);
    console.log(resp);
    return res.json({ respuesta: resp });
  },

  updateUser: async (req, res) => {
    const newUser = req.body;
    console.log(newUser);
    const resp = await User.insertMany(newUser);

    return res.json({ respuesta: resp });
  },

  removeUser: async (req, res) => {
    const newUser = req.body;
    console.log(newUser);
    const userDel = await User.findById(newUser.id);
    const resp = await User.remove(userDel);

    return res.json({ respuesta: resp });
  },

  updateUser: async (req, res) => {
    const update = req.body;
    const id = req.params;
    console.log({ id, update });

    const resp = await User.findOneAndUpdate(id, update);

    return res.json({ respuesta: resp });
  },

  follower: async (req, res) => {
    const info = req.body;
    const id = info.idUser;
    const idFol = info.idFollower;

    const resp = await User.findByIdAndUpdate(
      info.idUser,
      { $push: { followers: info.idFollower } },
      { new: true }
    );

    return res.json({ respuesta: resp });
  },
};

module.exports = userController;
