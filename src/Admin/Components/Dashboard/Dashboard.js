// import React from 'react';

// import { useAuth } from '../../../Components/Context/AuthContext';

// const Dashboard = () => {
//   const { user } = useAuth();
  
//   console.log("User data:", user);

//   return (
//     <div>
      
//       <h1>Dashboard</h1>
     
//         <h1>Welcome, {user.name}!!!</h1>
       
//     </div>
//   );
// };

// export default Dashboard;



import React from 'react';
import { useAuth } from '../../../Components/Context/AuthContext';
import Header from '../../../Admin/Components/Header/Header';
import '../../../Styles/Components/AdminDashboard.css'
import Sidebar from '../../../Admin/Components/Sidebar/Sidebar'; // Adjust the import path according to your project structure
//import '../../../Styles/Components/Dashboard.css'; // Add this line to import CSS for Dashboard component

const Dashboard = () => {
  const { user } = useAuth();
  
  console.log("User data:", user);

  return (
    <div>
      <Header />
    <div className="dashboard-container">
      
      <Sidebar />
      <div className="main-content">
        <h1 className='admindashboard-heading'>Dashboard</h1>
        <h2 className='admin-welcome'>Welcome Admin !!!</h2>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;

