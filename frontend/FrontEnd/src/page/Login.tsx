import React, { useState } from "react";
import api from "../services/Api";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", { email, password });
      const data = response.data;

      console.log("Token:", data.token);

      localStorage.setItem("token", data.token);

      setTimeout(() => {
        navigate("/students");
      }, 100);
    } catch (error) {
      alert("Credenciais inválidas.");
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <div className="bg-[#D64B14] hidden md:block"></div>

      <div className="flex flex-col justify-between p-6">
        <form
          onSubmit={handleSubmit}
          className="flex-grow flex flex-col items-center justify-center space-y-4"
        >
          <h2 className="font-poppins text-2xl md:text-3xl font-extrabold mb-2 text-center">
            Login
          </h2>
          <p className="font-poppins text-sm md:text-base font-light text-center mb-4">
            Entre com seu e-mail e senha
          </p>
          <div className="w-full max-w-md">
            <label className="font-poppins text-sm font-light block text-gray-700 mb-2">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-[#EEEEEE] border rounded-lg"
              required
            />
          </div>
          <div className="w-full max-w-md">
            <label className="font-poppins text-sm font-light block text-gray-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-[#EEEEEE] border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full max-w-md font-poppins text-sm md:text-base bg-[#D64B14] text-white p-3 rounded-lg font-extrabold"
          >
            Entrar
          </button>
        </form>
        <p className="font-poppins text-sm font-light text-center mt-4">
          Desenvolvido por Yan Garrido, Codetech
        </p>
      </div>
    </div>
  );
};

export default Login;
