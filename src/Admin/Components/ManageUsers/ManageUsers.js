// src/Admin/Components/ManageUsers/ManageUsers.js
import React, { useState } from 'react';
import { auth, db } from '../../../Components/Firebase/FirebaseConfig';
import Sidebar from '../../../Admin/Components/Sidebar/Sidebar';
import Header from '../../../Admin/Components/Header/Header';
import { useAuth } from '../../../Components/Context/AuthContext';
import './ManageUsers.css'; // Add this line to include the CSS file

const ManageUsers = () => {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setError('');

    try {
      // Create a user with email and password
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Add user data to Firestore
      await db.collection('users').doc(user.uid).set({
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
      <Sidebar />
     

      <div className="registration-container">
        <h2 className='registration-heading'>Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Mobile:</label>
            <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Register</button>
        </form>
      </div>
      </div>
      
    
  );
};

export default ManageUsers;
