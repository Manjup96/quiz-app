import React, { useState } from 'react';
import { db, auth } from '../Firebase/FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logo from "../Img/Company_logo.png" ; 

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {

      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

     
      await db.collection('users').doc(user.uid).set({
        name,
        email,
        password,
        createdAt: new Date(),
      });

     
      setName('');
      setEmail('');
      setPassword('');
      setError('');
      setIsSubmitting(false);


      alert('You have Registered successfully!');
      navigate('/'); 
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  const canSubmit = name.trim() !== '' && email.trim() !== '' && password.trim() !== '';

  return (
    <div className="d-flex justify-content-center align-items-center mt-5 pt-5">
      <div className="card" style={{ width: '36rem' }}>
        <div className="card-body">
          <div className="text-center mb-4">
            <img src={logo} alt="Logo" className="mb-3" style={{ width: '250px', height: '100px' }} />
            <h3>Register</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" style={{ fontWeight: 'bold' }}>Name</label>
              <input
                type="text"
                className="form-control mt-1"
                id="name"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" style={{ fontWeight: 'bold' }}>Email</label>
              <input
                type="email"
                className="form-control mt-1"
                id="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 position-relative">
              <label htmlFor="password" style={{ fontWeight: 'bold' }}>Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control mt-1"
                id="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={togglePasswordVisibility}
                className="position-absolute"
                style={{ right: '10px', top: '37px', cursor: 'pointer' }}
              />
            </div>
            {error && <div className="text-danger text-center">{error}</div>}
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!canSubmit || isSubmitting}
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
