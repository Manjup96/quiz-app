import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/FirebaseConfig'; // Ensure Firebase is correctly initialized
import logo from '../Img/chipper-sage-logo.png';
import '../Styles/ForgotPassword.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset sent to your email.');
      setError('');
      alert('Password reset sent to your email.');
      navigate('/'); 
    } catch (err) {
      setError('Failed to send password reset email. Please try again.');
      setMessage('');
      alert('Failed to send password reset email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="main-forgot-password">
      <div className="forgot-password-card">
        <div className="card forgot-card">
          <div className="forgot-password-card-body">
            <div className="forgot-password-img-div mt-2">
            <h2 className="forgot-password-title">Forgot Password</h2>
              <img src={logo} alt="Logo" />
            
            </div>
            <form onSubmit={handleSendEmail}>
              <div className="mb-3">
                <label htmlFor="email" style={{ fontWeight: 'bold' }} className="email-label">Email</label>
                <input
                  type="email"
                  className="form-control email-input"
                  id="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {error && <div className="text-danger text-center">{error}</div>}
              {message && <div className="text-success text-center">{message}</div>}
              <div className="text-center">
                <button
                  type="submit"
                  className="btn-success send-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Email'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
