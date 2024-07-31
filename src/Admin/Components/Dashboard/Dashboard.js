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


import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Components/Context/AuthContext';
import Header from '../../../Admin/Components/Header/Header';
import '../../../Styles/Components/AdminDashboard.css';
import Sidebar from '../../../Admin/Components/Sidebar/Sidebar';
import { db } from '../../../Components/Firebase/FirebaseConfig'; // Adjust the import path according to your project structure

const Dashboard = () => {
  const { user } = useAuth();
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const usersSnapshot = await db.collection('users').get();
        setUserCount(usersSnapshot.size);
      } catch (error) {
        console.error("Error fetching user count: ", error);
      }
    };

    fetchUserCount();
  }, []);

  console.log("User data:", user);

  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <Sidebar />
        <div className="main-content">
          <h1 className='admindashboard-heading'>Dashboard</h1>
          <h2 className='admin-welcome'>Welcome Admin !!!</h2>
          <p className='total-users'>Total Users: {userCount}</p> {/* Display user count here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
