import React from 'react';
import { useAuth } from '../Context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  
  console.log("User data:", user);

  return (
    <div>
      <h1>Dashboard</h1>
     
        <h1>Welcome, {user.name}!!!</h1>
      
    </div>
  );
};

export default Dashboard;
