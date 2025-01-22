import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentList from "./page/StudentsList";
import StudentForm from "./page/StudentForm";
import Login from "./page/Login";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/students/form" element={<StudentForm />} />
      </Routes>
    </Router>
  );
};

export default App;
