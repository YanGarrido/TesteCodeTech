require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/database");

connectDB();
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
