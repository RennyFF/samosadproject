import React from "react";
import { Header } from "./components/Header";
import { Route, Routes} from "react-router-dom";
import { StudentPage } from "./pages/StudentPage";
import { MainPage } from "./pages/MainPage";
import { Login } from "./pages/LoginPage";
import { Footer } from "./components/Footer";
import { TGButton } from "./components/TGbutton";
import {TeacherPage} from "./pages/TeacherPage";
function App() {
  return (
    <>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/teacher" element={<TeacherPage />} />
          <Route path="/diary" element={<StudentPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <TGButton />
      </div>
      <Footer />
    </>
  );
}

export default App;
