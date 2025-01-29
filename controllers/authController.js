const User = require("../models/User");
const jwt = require("jsonwebtoken");

const authController = {
  tokens: async (req, res) => {
    console.log(req.body);
    console.log("paso por tokens");
    //Verificar usuario en DB
    const user = await User.findOne({ username: req.body.username });

    if (!user) return res.json({ error: "Wrong credentials..." });

    //Verificar contraseña (la contraseña en db hace match con la recibida)
    const validatePassword = user.password === req.body.password;

    if (!validatePassword) return res.json({ error: "Wrong credentials..." });

    //Genero token
    const token = jwt.sign(
      { sub: user.id, username: user.username },
      process.env.JWT_SECRET
    );

    //Respondo con el token a la llamada
    res.json({ token, user });
  },
};

module.exports = authController;
