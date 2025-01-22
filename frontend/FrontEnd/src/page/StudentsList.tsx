import React, { useEffect, useState } from "react";
import api from "../services/Api";
import { TrashIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../services/authServices";

interface Student {
  _id: string;
  name: string;
  age: number;
  turma: string;
}

const StudentList: React.FC = () => {
  const [students, setStudent] = useState<Student[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      navigate("/");
    } else {
      api
        .get("/api/students", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setStudent(response.data))
        .catch((error) => {
          console.log("Erro ao Buscar alunos", error);

          if (
            error.response?.status === 401 ||
            error.response?.status === 403
          ) {
            navigate("/login");
          }
        });
    }
  }, [navigate]);

  const handleDelete = async (id: string) => {
    const token = getToken();
    try {
      await api.delete(`/api/students/${id}`,{
        headers: {Authorization: `Bearer ${token}`},
      });
      setStudent(students.filter((student) => student._id !== id));
    } catch (error) {
      console.log("Erro ao deletar", error);
    }
  };

  return (
    <div>
      <header className="bg-[#D64B14] w-screen h-[4.313rem] relative">
        <h1 className="text-white absolute top-[10px] left-[50px] w-[212px] h-[34px] font-poppins text-[36px] font-extrabold leading-[54px] text-left underline-custom">
          CODETECH
        </h1>
      </header>
      <main>
        <div className=" flex justify-between">
          <h2 className="w-[88px] h-[36px] mt-[34px] ml-[96px] font-poppins font-extrabold text-[24px] ">
            Alunos
          </h2>
          <Link to="/students/form">
            <button className="bg-[#D64B14] w-[174px] h-[50px] mt-[28px] mr-[64px] rounded-[8px] font-poppins font-extrabold text-[14px] text-white hover:bg-[#A63A0F] transition duration-300">
              Criar Registro
            </button>
          </Link>
        </div>
        <div className="flex justify-center">
          <table className="w-[90%] max-w-[1310px] mt-[38px] border-collapse">
            <thead className=" border-b-2 rouded-[8px] border-[#EEEEEE]">
              <tr className="bg-[#EEEEEE] text-black text-center font-poppins">
                <th className="p-2 font-light text-[14px]">nome</th>
                <th className="p-2 font-light text-[14px]">idade</th>
                <th className="p-2 font-light text-[14px]">turma</th>
                <th className="p-2 font-light text-[14px]">deletar</th>
              </tr>
            </thead>
            <tbody className="text-center font-poppins font-light">
              {students.map((student) => (
                <tr key={student._id} className=" border-b-[1px]">
                  <td className="p-2 font-light text-[14px]">{student.name}</td>
                  <td className="p-2 font-light text-[14px]">{student.age}</td>
                  <td className="p-2 font-light text-[14px]">
                    {student.turma}
                  </td>
                  <td className="p-2 font-light text-[14px]">
                    <button onClick={() => handleDelete(student._id)}>
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default StudentList;
