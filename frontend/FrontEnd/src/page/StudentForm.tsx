import React, { useState } from "react";
import api from "../services/Api";

const StudentForm: React.FC = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [turma, setTurma] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/api/students", {
        name,
        age: Number(age),
        turma,
      });
      alert("Aluno cadastrado com sucesso!");
      setName("");
      setAge("");
      setTurma("");
    } catch (error) {
      console.log("Erro ao cadastrar aluno", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Aluno</h1>
      <button>Voltar</button>
      <div>
        <label>
          Nome:
        </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
      </div>
      <div>
        <label>
          Idade:
        </label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required/>
      </div>
      <div>
        <label>
          Turma:
        </label>
        <input type="text" value={turma} onChange={(e) => setTurma(e.target.value)} required/>
      </div>
      <button type="submit">Salvar</button>
    </form>
  )
};

export default StudentForm;
