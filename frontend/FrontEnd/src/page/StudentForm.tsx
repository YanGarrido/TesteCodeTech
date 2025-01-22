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
    <div className="grid grid-cols-[312px_1fr] ">
      <header className="bg-[#D64B14] flex flex-col w-[312px] h-screen justify-between font-poppins text-white">
        <div className="text-center mt-[90px] mb-[8px]">
          <h1 className="font-extrabold text-[36px] h-[38px]">CODETECH</h1>
          <p className="font-extralight text-[12px]">
            desenvolvimento de sistemas
          </p>
        </div>

        <button className="w-[312px] h-[50px] bg-[#EC622C] mt-[8px] text-left">
          <span className="ml-[59px] text-[18px] font-semibold">Alunos</span>
        </button>

        <p className="font-extralight text-[12px] text-center mt-auto">
          desenvolvido por Yan Garrido, Codetech
        </p>
      </header>

      <main>
        <div className="h-[70px] border-b-2 border-[#EEEEEE]"></div>
        <div className="flex justify-between font-poppins font-extrabold mt-[27px] mx-[64px] mb-[32px]">
          <h2 className="text-black text-[24px] mt-[6px]">Alunos</h2>
          <Link to="/students">
            <button className="rounded-[8px] bg-[#D64B14] text-white text-[14px] px-[64px] py-[15px] hover:bg-[#A63A0F] transition duration-300">
              Voltar
            </button>
          </Link>
        </div>
        <div className="border-[2px] rounded-[16px] mx-[64px] h-[367px]">
          <form
            onSubmit={handleSubmit}
            className=" mt-[54px] ml-[46px] font-poppins font-extralight text-[14px]"
          >
            <div className="flex">
              <div className=" flex flex-col ">
                <label>nome completo</label>
                <input
                  className="bg-[#EEEEEE] w-[547px] h-[50px] mr-[32px] rounded-[8px] p-1 "
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col ">
                <label>idade</label>
                <input
                  className="bg-[#EEEEEE] w-[153px] h-[50px] rounded-[8px] p-1"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col ">
              <label className=" mt-[24px]">turma</label>
              <input
                className="bg-[#EEEEEE] w-[547px] h-[50px] rounded-[8px] p-1"
                type="text"
                value={turma}
                onChange={(e) => setTurma(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="rounded-[8px] bg-[#D64B14] px-[64px] py-[15px] text-white text-[14px] font-poppins font-extrabold mt-[39px] hover:bg-[#A63A0F] transition duration-300"
            >
              salvar
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default StudentForm;
