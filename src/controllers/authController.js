const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = {
  register: async (req, res) => {
    const { name, email, password, confirmpassword } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Todos os campos são obrigatórios!" });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ msg: "As senhas não conferem!" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "Email já registrado!" });
    }

    try {
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      const user = new User({ name, email, password: passwordHash });
      await user.save();

      res.status(201).json({ msg: "Usuário criado com sucesso!" });
    } catch (err) {
      res.status(500).json({ msg: "Erro ao criar usuário!" });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email e senha são obrigatórios!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({ msg: "Senha inválida!" });
    }

    try {
      const secret = process.env.SECRET;
      const token = jwt.sign({ id: user._id }, secret, { expiresIn: "1h" });

      res.status(200).json({ msg: "Login bem-sucedido!", token });
    } catch (err) {
      res.status(500).json({ msg: "Erro no servidor" });
    }
  },
};
