const Student = require("../models/Student");

module.exports = {
  createStudent: async (req, res) => {
    const { name, age, turma } = req.body;

    if (!name || !age || !turma) {
      return res.status(400).json({ msg: "Todos os campos são obrigatórios!" });
    }

    const student = new Student({ name, age, turma });

    try {
      const savedStudent = await student.save();
      res.status(200).json(savedStudent);
    } catch (error) {
      res.status(500).json({ msg: "Erro ao criar alunos", error });
    }
  },

  listStudent: async (req, res) => {
    try {
      const students = await Student.find();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ msg: "Erro ao listar alunos", error });
    }
  },

  deleteStudent: async (req, res) => {
    const { id } = req.params;

    try {
      const student = await Student.findByIdAndDelete(id);

      if (!student) {
        return res.status(404).json({ msg: "Aluno não encontrado!" });
      }

      res.status(200).json({ msg: "Aluno deletado com sucesso!" });
    } catch (error) {
      res.status(404).json({ msg: "Erro ao deletar o aluno", error });
    }
  },
};
