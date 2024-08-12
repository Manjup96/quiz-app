import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Replace Redirect with Navigate
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "react-query";
import SignUp from "./Components/SignUp/Signup";
import Login from "./Components/SignIn/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import { AuthProvider }  from "./Components/Context/AuthContext";

import AdminLogin from "../src/Admin/Components/Login/Login";
import AdminDashboard from "../src/Admin/Components/Dashboard/Dashboard";
import Sidebar from "../src/Admin/Components/Sidebar/Sidebar";

import ForgotPassword from "./Components/SignIn/ForgotPassword";
// import VerifyOTP from './Components/SignIn/VerifyOTP';
import User from "../src/Admin/Components/User/User";
import ManageUsers from "../src/Admin/Components/ManageUsers/ManageUsers"
import Score from "../src/Admin/Components/Scores/Scores";
import LeaderBoard from "./Components/Cohort/LeaderBoard";

// Passage1 Routes
import Website from "./Components/Website/website";
import Vocabulary from "./Components/Website/Vocabulary"
import Comprehension from "./Components/Website/Comprehension";
import FillInTheBlank from "./Components/Website/FillInTheBlanks";
import Jumblewords from "./Components/Website/JumbledWords";
import Spelling from "./Components/Website/Spelling";

// Passage2 Routes
import Passage2 from "../src/Components/Passage 2/Passage2";
import Comprehension2 from "./Components/Passage 2/Comprehension"
import Vocabulary2 from "./Components/Passage 2/Vocabulary"
import FillInTheBlanks2 from "./Components/Passage 2/FillInTheBlanks"
import JumbledWords2 from "./Components/Passage 2/JumbledWords"
import Spelling2 from "./Components/Passage 2/Spelling"
// Passage3 Routes

import Passage3 from "../src/Components/Passage 3/Passage3";
import Comprehension3 from "./Components/Passage 3/Comprehension"
import Vocabulary3 from "./Components/Passage 3/Vocabulary"
import FillInTheBlanks3 from "./Components/Passage 3/FillInTheBlanks"
import JumbledWords3 from "./Components/Passage 3/JumbledWords"
import Spelling3 from "./Components/Passage 3/Spelling"

// Passage4 Routes

// Passage5 Routes

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>

<AuthProvider>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/user" element={<User />} />
        <Route path="/manageUsers" element={<ManageUsers />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/scores" element={<Score />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />

          {/* Passage1 Routes */}
            <Route path="/website" element={<Website />} />
            <Route path="/Comprehension" element={<Comprehension />} />
            <Route path="/Vocabulary" element={<Vocabulary />} />
            <Route path="/FillInTheBlank" element={<FillInTheBlank />} />
            <Route path="/Jumblewords" element={<Jumblewords />} />
            <Route path="/Spelling" element={<Spelling />} />

        {/* Passage2 Routes */}
        <Route path="/website2" element={<Passage2 />} />
            <Route path="/Comprehension2" element={<Comprehension2 />} />
            <Route path="/Vocabulary2" element={<Vocabulary2 />} />
            <Route path="/FillInTheBlank2" element={<FillInTheBlanks2 />} />
            <Route path="/Jumblewords2" element={<JumbledWords2 />} />
            <Route path="/Spelling2" element={<Spelling2 />} />


            <Route path="/website3" element={<Passage3 />} />
            <Route path="/Comprehension3" element={<Comprehension3 />} />
            <Route path="/Vocabulary3" element={<Vocabulary3 />} />
            <Route path="/FillInTheBlank3" element={<FillInTheBlanks3 />} />
            <Route path="/Jumblewords3" element={<JumbledWords3/>} />
            <Route path="/Spelling3" element={<Spelling3 />} />


      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;