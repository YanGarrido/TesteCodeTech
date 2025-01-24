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
      await api.delete(`/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudent(students.filter((student) => student._id !== id));
    } catch (error) {
      console.log("Erro ao deletar", error);
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-[#D64B14] w-full h-[4.313rem] flex items-center px-4 md:px-12">
        <h1 className="text-white font-poppins text-[24px] md:text-[36px] font-extrabold underline-custom">
          CODETECH
        </h1>
      </header>

      {/* Main Content */}
      <main className="px-4 md:px-12">
        {/* Title and Button */}
        <div className="flex flex-wrap items-center justify-between mt-4">
          <h2 className="font-poppins font-extrabold text-[18px] md:text-[24px]">
            Alunos
          </h2>
          <Link to="/students/form">
            <button className="bg-[#D64B14] rounded-[8px] font-poppins font-extrabold text-[14px] text-white py-2 px-4 md:py-[14px] md:px-[20px] hover:bg-[#A63A0F] transition duration-300">
              Criar Registro
            </button>
          </Link>
        </div>

        {/* Table */}
        <div className="flex justify-center overflow-x-auto mt-6">
          <table className="w-full max-w-[1310px] border-collapse">
            {/* Table Head */}
            <thead className="border-b-2 border-[#EEEEEE]">
              <tr className="bg-[#EEEEEE] text-black text-center font-poppins">
                <th className="p-2 font-light text-[12px] md:text-[14px]">
                  Nome
                </th>
                <th className="p-2 font-light text-[12px] md:text-[14px]">
                  Idade
                </th>
                <th className="p-2 font-light text-[12px] md:text-[14px]">
                  Turma
                </th>
                <th className="p-2 font-light text-[12px] md:text-[14px]">
                  Deletar
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-center font-poppins font-light">
              {students.map((student) => (
                <tr key={student._id} className="border-b">
                  <td className="p-2 text-[12px] md:text-[14px]">
                    {student.name}
                  </td>
                  <td className="p-2 text-[12px] md:text-[14px]">
                    {student.age}
                  </td>
                  <td className="p-2 text-[12px] md:text-[14px]">
                    {student.turma}
                  </td>
                  <td className="p-2 text-[12px] md:text-[14px]">
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
