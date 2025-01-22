const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbUser = process.env.DB_USER;
    const dbPass = process.env.DB_PASS;

    await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPass}@cluster0.lbstt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
    console.log("Conexão com MongoDB bem-sucedida!");
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
