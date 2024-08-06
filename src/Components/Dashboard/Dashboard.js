
import React from 'react';
import { useAuth } from '../Context/AuthContext';
import Header from '../Header/Header';
import Header2 from '../Header/Header2';
import Stages from "../Stages/Stages";
import LeaderBoard from '../Cohort/LeaderBoard';
import "../../Styles/UserDashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  console.log("User data:", user);
  return (
    <div>
      <Header />
      
      <h1>Dashboard</h1>
      {/* {user && (
        <div>
          <h1>Welcome, {user.name}!!!</h1>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>UID: {user.uid}</p>
          <p>Created At: {new Date(user.createdAt).toLocaleString()}</p>
        </div>
        
      )} */}
      <Header2 />
      <div >
      <Stages/>
      <LeaderBoard/>
      </div>
    </div>
  );
};

export default Dashboard;
