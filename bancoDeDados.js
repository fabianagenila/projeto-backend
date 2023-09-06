const mongoose = require("mongoose");
require("dotenv").config();

async function conectaBancoDeDados() {
  try {
    console.log("Conexão com banco de dados iniciou.");

    await mongoose.connect(process.env.MONGO_URL);

    console.log("Conexão com o banco de dados realizado com sucesso!");
  } catch (error) {
    console.log(error);
  }
}

module.exports = conectaBancoDeDados;
