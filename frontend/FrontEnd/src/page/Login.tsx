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
      const data =  response.data;
      alert("Login bem-sucedido!");
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
    <div className="grid grid-cols-[1fr_1fr]">
      <div className="bg-[#D64B14]"></div>
      <div className="flex flex-col justify-between h-screen">
        <form
          onSubmit={handleSubmit}
          className="flex-grow flex flex-col items-center justify-center"
        >
          <h2 className="font-poppins text-[32px] font-extrabold mb-[6px] text-center">
            Login
          </h2>
          <p className="font-poppins text-[14px] font-light text-center mb-6">
            entre com seu email e senha
          </p>
          <div className="mb-4">
            <label className="font-poppins text-[14px] font-light block text-gray-700 mb-2">
              e-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[547px] p-3 bg-[#EEEEEE] border rounded-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label className="font-poppins text-[14px] font-light block text-gray-700 mb-2">
              senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[547px] p-3 bg-[#EEEEEE] border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className=" mt-[30px]font-poppins text-[14px] bg-[#D64B14] text-white p-3 rounded-lg font-extrabold w-[547px]"
          >
            Entrar
          </button>
        </form>
        <p className="font-poppins text-[14px] font-light text-center mb-4">
          desenvolvido por Yan Garrido, Codetech
        </p>
      </div>
    </div>
  );
};

export default Login;
