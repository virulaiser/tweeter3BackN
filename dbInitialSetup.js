const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose
  .connect(process.env.DB_DATABASE, {})
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((error) => {
    console.error("Error de conexión a la base de datos:", error);
  });

module.exports = { mongoose, Schema };
