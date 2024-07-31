// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import Sidebar from '../../../Admin/Components/Sidebar/Sidebar'; 
import Header from '../../../Admin/Components/Header/Header';
import { useAuth } from '../../../Components/Context/AuthContext';
import { db } from '../../../Components/Firebase/FirebaseConfig'; // Ensure the path is correct
import '../../../Styles/Components/AdminUser.css'; // Import the CSS file

const User = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user details from Firestore
    const fetchUserDetails = async () => {
      try {
        const usersCollection = await db.collection('users').get();
        const usersData = usersCollection.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUserDetails();
  }, []);

  console.log("User data:", user);
  console.log("Fetched users: ", users);

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="user-table-container">
        <h1 className='user-table-heading'>User Details</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
         
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
