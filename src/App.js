import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Replace Redirect with Navigate
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "react-query";
import SignUp from "./Components/SignUp/Signup";
import Login from "./Components/SignIn/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import { AuthProvider }  from "./Components/Context/AuthContext";

import AdminnLogin from "../src/Admin/Components/Login/Login";
import AdminDashboard from "../src/Admin/Components/Dashboard/Dashboard";
import Sidebar from "../src/Admin/Components/Sidebar/Sidebar";
import UserSignup from "../src/Admin/Components/User/UserSignup"
import ForgotPassword from "./Components/SignIn/ForgotPassword";
import VerifyOTP from './Components/SignIn/VerifyOTP';
import User from "../src/Admin/Components/User/User";
import ManageUsers from "../src/Admin/Components/ManageUsers/ManageUsers"

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
        <Route path="/admin" element={<AdminnLogin />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/userSignup" element={<UserSignup />} />
        <Route path="/user" element={<User />} />
        <Route path="/manageUsers" element={<ManageUsers />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;