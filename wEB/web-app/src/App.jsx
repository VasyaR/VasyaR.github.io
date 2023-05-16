import { useState } from "react";
import { Route, Routes } from "react-router";
import Mainpage from "./pages/Mainpage";
import Myaccount from "./pages/Myaccount";
import Login from "./pages/Login";
import Marklist from "./pages/Marklist";
import Subjects from "./pages/Subjects";
import Teacherlist from "./pages/Teacherlist";
import Universities from "./pages/Universities";
import Univeristyrating from "./pages/Universityrating";
import NewUser from "./pages/NewUser";
import Header from "./components/Header";
import Chat from "./pages/Chat";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/mainpage" element={<Mainpage />} />
        <Route path="/myaccount" element={<Myaccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/marklist" element={<Marklist />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/teacherlist" element={<Teacherlist />} />
        <Route path="/universities" element={<Universities />} />
        <Route path="/universityrating" element={<Univeristyrating />} />
        <Route path="/newuser" element={<NewUser />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
