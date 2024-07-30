import React from 'react';
import { useAuth } from '../Context/AuthContext';
import Header from '../Header/Header';


const Dashboard = () => {
  const { user } = useAuth();
  
  console.log("User data:", user);

  return (
    <div>
      <Header />
      <h1>Dashboard</h1>
     
        <h1>Welcome, {user.name}!!!</h1>
      
    </div>
  );
};

export default Dashboard;
