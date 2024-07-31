import React from 'react';
import Sidebar from '../../../Admin/Components/Sidebar/Sidebar'; 
import Header from '../../../Admin/Components/Header/Header';
import { useAuth } from '../../../Components/Context/AuthContext';

const User = () => {
  const { user } = useAuth();
  
  console.log("User data:", user);

  return (
    <div>
        <Header />
       <Sidebar />

      <h1>User Signup</h1>
     
        <h1>Welcome, {user.name}!!!</h1>
       
    </div>
  );
};

export default User;