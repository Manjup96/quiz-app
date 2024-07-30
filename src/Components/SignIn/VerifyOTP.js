// Components/ForgotPassword/VerifyOTP.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/FirebaseConfig';
import logo from '../Img/Company_logo.png';

const VerifyOTP = ({ phoneNumber }) => {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const confirmationResult = window.confirmationResult;
      await confirmationResult.confirm(verificationCode);
      setMessage('Phone number verified successfully.');
      setError('');
      navigate('/');
    } catch (err) {
      setError('Invalid verification code. Please try again.');
      setMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5 pt-5">
      <div className="card" style={{ width: '36rem' }}>
        <div className="card-body">
          <div className="text-center mb-4">
            <img src={logo} alt="Logo" className="mb-3" style={{ width: '250px', height: '100px' }} />
            <h3>Enter OTP</h3>
          </div>
          <form onSubmit={handleVerifyCode}>
            <div className="mb-3">
              <label htmlFor="verificationCode" style={{ fontWeight: 'bold' }}>Verification Code</label>
              <input
                type="text"
                className="form-control mt-1"
                id="verificationCode"
                placeholder="Enter the verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-danger text-center">{error}</div>}
            {message && <div className="text-success text-center">{message}</div>}
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Verifying...' : 'Verify Code'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
