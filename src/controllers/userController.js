const User = require("../models/User");

module.exports = {
  getUserById: async (req, res) => {
    const id = req.params.id;

    try {
      const user = await User.findById(id, "-password");
      if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado!" });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ msg: "Erro no servidor" });
    }
  },
};
