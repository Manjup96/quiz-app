import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { useAuth } from '../../../Components/Context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  
  console.log("User data:", user);

  return (
    <div>
      <Sidebar/>
      <h1>Dashboard</h1>
     
        <h1>Welcome, {user.name}!!!</h1>
       
    </div>
  );
};

export default Dashboard;
