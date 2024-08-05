import React, { useEffect, useState } from 'react';
import Sidebar from '../../../Admin/Components/Sidebar/Sidebar'; 
import Header from '../../../Admin/Components/Header/Header';
import { useAuth } from '../../../Components/Context/AuthContext';
import { db, auth } from '../../../Components/Firebase/FirebaseConfig'; // Import auth as well
import '../../../Styles/Components/AdminUser.css'; // Import the CSS file

const User = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    email: '',
    mobile: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
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

  const handleDelete = async (id) => {
    try {
      // Delete the user from Firestore
      await db.collection('users').doc(id).delete();

      // If logged in with an admin account, delete the user from Firebase Authentication
      if (auth.currentUser && auth.currentUser.uid === id) {
        await auth.currentUser.delete();
      }

      // Update the local state to remove the deleted user
      setUsers(users.filter(user => user.uid !== id));
      console.log(`User with ID: ${id} deleted successfully`);
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  const handleUpdate = (userId) => {
    const userToEdit = users.find(user => user.uid === userId);
    setEditingUser(userToEdit);
    setUpdatedUser({
      name: userToEdit.name,
      email: userToEdit.email,
      mobile: userToEdit.mobile
    });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await db.collection('users').doc(editingUser.uid).update(updatedUser);
      const updatedUsers = users.map(user =>
        user.id === editingUser.uid ? { ...user, ...updatedUser } : user
      );
      setUsers(updatedUsers);
      setIsEditing(false);
      setEditingUser(null);
      setUpdatedUser({
        name: '',
        email: '',
        mobile: ''
      });
      console.log(`User with ID: ${editingUser.id} updated successfully`);
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="user-table-container">
        <h1 className='user-table-heading'>User Details</h1>
        <div className='table-main'>
          <table className='user_table_main'>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Student ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>
                    <i 
                      className="fa-solid fa-edit"
                      onClick={() => handleUpdate(user.id)}
                      style={{ cursor: 'pointer', marginRight: '10px', color:'blue' }}
                    ></i>
                    <i 
                      className="fa-solid fa-trash-alt"
                      onClick={() => handleDelete(user.id)}
                      style={{ cursor: 'pointer', color:'red'}}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isEditing && (
          <div className="update-form">
            <h2>Update User</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={updatedUser.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={updatedUser.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Mobile:
                <input
                  type="text"
                  name="mobile"
                  value={updatedUser.mobile}
                  onChange={handleChange}
                  required
                />
              </label>
              <button type="submit">Update</button>
              <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
