

import React, { useState } from 'react';
import { db, auth } from '../Firebase/FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import logo from "../Img/main-logo.png"; 
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      await db.collection('users').doc(user.uid).set({
        email,
        mobile,
        password,
        createdAt: new Date(),
      });

      setEmail('');
      setPassword('');
      setMobile('');
      setError('');
      setIsSubmitting(false);

      alert('You have registered successfully!');
      navigate('/'); 
    } catch (err) {
      console.error("Error during registration: ", err);
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  const canSubmit = email.trim() !== '' && password.trim() !== '' && mobile.trim() !== '';

  return (
    <div className="signup-main">
      <div className="signup-card">
        <div className="signup-card-body">
          <div className="signup-img-div">
            <img src={logo} alt="Logo" />
          </div>
          <form className='signup-form' onSubmit={handleSubmit}>
            <div className='signup_position_relative'>
              <input
                type="email"
                id="signup_email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="info-icon" data-tooltip="The email that you used during the sign up process.">
                <FontAwesomeIcon icon={faInfoCircle} />
              </span>
            </div>
            <div className='signup_position_relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                id="signup_password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="info-icon" data-tooltip="Your password must be at least 8 characters long.">
                <FontAwesomeIcon icon={faInfoCircle} />
              </span>
              <span className="toggle-password" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
            <div className='signup_position_relative'>
              <input
                type="text"
                id="signup_mobile"
                placeholder="Enter Your Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
              <span className="info-icon" data-tooltip="Your mobile number.">
                <FontAwesomeIcon icon={faInfoCircle} />
              </span>
            </div>
            {error && <div className="text-danger text-center">{error}</div>}
            <div className="button-main">
              <button
                type="submit"
                className="btn-sub"
                disabled={!canSubmit || isSubmitting}
              >
                {isSubmitting ? 'Registering...' : 'Sign Up'}
              </button>
            </div>
            <div className="forgot-password">
              <a onClick={() => navigate('/forgot-password')}>
                Forgot Password?
              </a>
            </div>
            <div className="sign-up-text">
              <p>
                <a onClick={() => navigate('/')}>
                  &nbsp;Sign In
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

