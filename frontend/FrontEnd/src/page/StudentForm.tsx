import React, { useState, useEffect } from "react";
import api from "../services/Api";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../services/authServices";

const StudentForm: React.FC = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [turma, setTurma] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken;
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = getToken();
      if (!token) {
        navigate("/");
        return;
      }

      await api.post(
        "/api/students",
        {
          name,
          age: Number(age),
          turma,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Aluno cadastrado com sucesso!");
      setName("");
      setAge("");
      setTurma("");
    } catch (error) {
      console.log("Erro ao cadastrar aluno", error);
    }
  };
  return (
    <div className="grid md:grid-cols-[312px_1fr] grid-cols-1">
      {/* Sidebar */}
      <header className="bg-[#D64B14] flex flex-col md:w-[312px] w-full h-auto md:h-screen justify-between font-poppins text-white p-4 md:p-0">
        <div className="text-center mt-[40px] md:mt-[90px] mb-[16px]">
          <h1 className="font-extrabold text-[24px] md:text-[36px]">
            CODETECH
          </h1>
          <p className="font-extralight text-[12px]">
            desenvolvimento de sistemas
          </p>
        </div>

        <button className="w-full md:w-[312px] h-[50px] bg-[#EC622C] mt-[16px] text-left">
          <span className="ml-[20px] md:ml-[59px] text-[16px] md:text-[18px] font-semibold">
            Alunos
          </span>
        </button>

        <p className="font-extralight text-[12px] text-center mt-4 md:mt-auto">
          desenvolvido por Yan Garrido, Codetech
        </p>
      </header>

      {/* Main Content */}
      <main>
        {/* Header */}
        <div className="h-[70px] border-b-2 border-[#EEEEEE]"></div>

        {/* Title and Back Button */}
        <div className="flex flex-wrap justify-between font-poppins font-extrabold mt-[20px] md:mt-[27px] mx-[16px] md:mx-[64px] mb-[32px]">
          <h2 className="text-black text-[18px] md:text-[24px] mt-[6px]">
            Alunos
          </h2>
          <Link to="/students">
            <button className="rounded-[8px] bg-[#D64B14] text-white text-[14px] px-[32px] md:px-[64px] py-[10px] md:py-[15px] hover:bg-[#A63A0F] transition duration-300">
              Voltar
            </button>
          </Link>
        </div>

        {/* Form Section */}
        <div className="border-[2px] rounded-[16px] mx-[16px] md:mx-[64px] p-4 md:p-6">
          <form
            onSubmit={handleSubmit}
            className="font-poppins font-extralight text-[14px] space-y-6"
          >
            {/* Name and Age Fields */}
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col w-full md:w-[65%]">
                <label>Nome Completo</label>
                <input
                  className="bg-[#EEEEEE] w-full h-[50px] rounded-[8px] p-2"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col w-full md:w-[30%]">
                <label>Idade</label>
                <input
                  className="bg-[#EEEEEE] w-full h-[50px] rounded-[8px] p-2"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Turma Field */}
            <div className="flex flex-col">
              <label>Turma</label>
              <input
                className="bg-[#EEEEEE] w-full h-[50px] rounded-[8px] p-2"
                type="text"
                value={turma}
                onChange={(e) => setTurma(e.target.value)}
                required
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="rounded-[8px] bg-[#D64B14] px-[32px] md:px-[64px] py-[10px] md:py-[15px] text-white text-[14px] font-poppins font-extrabold hover:bg-[#A63A0F] transition duration-300"
            >
              Salvar
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default StudentForm;
