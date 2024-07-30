import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { auth, db } from '../../../Components/Firebase/FirebaseConfig';
import { useAuth } from '../../../Components/Context/AuthContext';
import logo from '../../../Components/Img/Company_logo.png'; // Corrected path

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(''); // Reset error message

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch additional user data from Firestore
      const userDoc = await db.collection('admin').doc(user.uid).get();
      const userData = userDoc.data();

      // Ensure name is part of the user object
      if (userData && userData.email === 'sai@gmail.com') {
        login(userData); // Save userData in context and sessionStorage
        navigate('/Admindashboard');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = email.trim() !== '' && password.trim() !== '';

  return (
    <div className="d-flex justify-content-center align-items-center mt-5 pt-5">
      <div className="card" style={{ width: '36rem' }}>
        <div className="card-body">
          <div className="text-center mb-4">
            <img src={logo} alt="Logo" className="mb-3" style={{ width: '250px', height: '100px' }} />
            <h3>Login</h3>
          </div>
          <form onSubmit={handleLogin}>
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
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </div>
            {/* <div className="text-center mt-3">
              <p>
                Don't have an account?&nbsp;
                <a
                  onClick={() => navigate('/signUp')}
                  style={{ textDecoration: 'none', color: '#007bff', cursor: 'pointer' }}
                >
                  Register
                </a>
                &nbsp;here
              </p>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
