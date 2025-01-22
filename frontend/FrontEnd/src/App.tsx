import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentList from "./page/StudentsList";
import StudentForm from "./page/StudentForm";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/create" element={<StudentForm />} />
      </Routes>
    </Router>
  );
};

export default App;
