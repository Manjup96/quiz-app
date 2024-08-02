import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../Components/Firebase/FirebaseConfig';
import Sidebar from '../../../Admin/Components/Sidebar/Sidebar';
import Header from '../../../Admin/Components/Header/Header';
import { useAuth } from '../../../Components/Context/AuthContext';
import './ManageUsers.css'; // Ensure you create and include this CSS file

const ManageUsers = () => {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [newUserId, setNewUserId] = useState('');

  useEffect(() => {
    const fetchLatestUserId = async () => {
      try {
        const querySnapshot = await db.collection('users').orderBy('createdAt', 'desc').limit(1).get();
        if (!querySnapshot.empty) {
          const latestUser = querySnapshot.docs[0].data();
          const latestUserId = latestUser.id;
          const latestIdNumber = parseInt(latestUserId.replace('std', ''));
          setNewUserId(`std${latestIdNumber + 1}`);
        } else {
          setNewUserId('std1'); // If no users exist, start with std1
        }
      } catch (err) {
        console.error("Error fetching latest user ID: ", err);
        setError('Error fetching latest user ID');
      }
    };

    fetchLatestUserId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    try {
      // Create a user with email and password
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Add user data to Firestore
      await db.collection('users').doc(user.uid).set({
        id: newUserId,
        name,
        email,
        password,
        mobile,
        createdAt: new Date(),
      });

      // Clear the form
      setName('');
      setEmail('');
      setPassword('');
      setMobile('');
      setError('');
      alert('Registered successfully!');
    } catch (err) {
      console.error("Error during registration: ", err);
      setError(err.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="manage-users-container">
        <Sidebar />
        <div className="manage-users-form-container">
          <h2 className='manage-users-heading'>Registration</h2>
          <div className="manage-users-form-card">
            <form onSubmit={handleSubmit} className="registration-form">
              <div className="manage-users-form-group">
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="manage-users-form-group">
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="manage-users-form-group">
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="manage-users-form-group">
                <label>Mobile:</label>
                <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
              </div>
              {error && <p className="error-message">{error}</p>}
              <button className="manage-users-register-button" type="submit">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
