// // Components/ForgotPassword/ForgotPassword.js
// import React, { useState } from 'react';
// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
// import { auth } from '../Firebase/FirebaseConfig';
// import logo from '../Img/Company_logo.png';

// const ForgotPassword = () => {
//   const navigate = useNavigate();
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [verificationCode, setVerificationCode] = useState('');
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isCodeSent, setIsCodeSent] = useState(false);

//   const setupRecaptcha = () => {
//     window.recaptchaVerifier = new RecaptchaVerifier(
//       'recaptcha-container',
//       {
//         size: 'invisible',
//         callback: (response) => {
//           // reCAPTCHA solved, allow signInWithPhoneNumber.
//           handleSendCode();
//         },
//       },
//       auth
//     );
//   };

//   const handleSendCode = async () => {
//     setIsSubmitting(true);
//     setupRecaptcha();
//     const appVerifier = window.recaptchaVerifier;

//     try {
//       await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
//       setMessage('Verification code sent to your phone.');
//       setError('');
//       setIsCodeSent(true);
//     } catch (err) {
//       setError('Failed to send verification code. Please try again.');
//       setMessage('');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleVerifyCode = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const confirmationResult = window.confirmationResult;
//       await confirmationResult.confirm(verificationCode);
//       setMessage('Phone number verified successfully.');
//       setError('');
//       navigate('/');
//     } catch (err) {
//       setError('Invalid verification code. Please try again.');
//       setMessage('');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center mt-5 pt-5">
//       <div className="card" style={{ width: '36rem' }}>
//         <div className="card-body">
//           <div className="text-center mb-4">
//             <img src={logo} alt="Logo" className="mb-3" style={{ width: '250px', height: '100px' }} />
//             <h3>Forgot Password</h3>
//           </div>
//           <form onSubmit={isCodeSent ? handleVerifyCode : handleSendCode}>
//             <div className="mb-3">
//               <label htmlFor="phoneNumber" style={{ fontWeight: 'bold' }}>Phone Number</label>
//               <input
//                 type="tel"
//                 className="form-control mt-1"
//                 id="phoneNumber"
//                 placeholder="Enter Your Phone Number"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 disabled={isCodeSent}
//                 required
//               />
//             </div>
//             {isCodeSent && (
//               <div className="mb-3">
//                 <label htmlFor="verificationCode" style={{ fontWeight: 'bold' }}>Verification Code</label>
//                 <input
//                   type="text"
//                   className="form-control mt-1"
//                   id="verificationCode"
//                   placeholder="Enter the verification code"
//                   value={verificationCode}
//                   onChange={(e) => setVerificationCode(e.target.value)}
//                   required
//                 />
//               </div>
//             )}
//             <div id="recaptcha-container"></div>
//             {error && <div className="text-danger text-center">{error}</div>}
//             {message && <div className="text-success text-center">{message}</div>}
//             <div className="text-center">
//               <button
//                 type="submit"
//                 className="btn btn-primary"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? 'Submitting...' : isCodeSent ? 'Verify Code' : 'Send Code'}
//               </button>
//             </div>
           
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;


// Components/ForgotPassword/ForgotPassword.js
// import React, { useState } from 'react';
// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
// import { auth } from '../Firebase/FirebaseConfig';
// import logo from '../Img/Company_logo.png';

// const ForgotPassword = () => {
//   const navigate = useNavigate();
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const setupRecaptcha = () => {
//     window.recaptchaVerifier = new RecaptchaVerifier(
//       'recaptcha-container',
//       {
//         size: 'invisible',
//         callback: (response) => {
//           // reCAPTCHA solved, allow signInWithPhoneNumber.
//           handleSendCode();
//         },
//       },
//       auth
//     );
//   };

//   const handleSendCode = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setupRecaptcha();
//     const appVerifier = window.recaptchaVerifier;

//     try {
//       const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
//       window.confirmationResult = confirmationResult; // Store confirmationResult globally

//       setMessage('Verification code sent to your phone.');
//       setError('');
//       navigate('/verify-otp', { state: { phoneNumber } }); // Navigate to the OTP verification page
//     } catch (err) {
//       setError('Failed to send verification code. Please try again.');
//       setMessage('');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center mt-5 pt-5">
//       <div className="card" style={{ width: '36rem' }}>
//         <div className="card-body">
//           <div className="text-center mb-4">
//             <img src={logo} alt="Logo" className="mb-3" style={{ width: '250px', height: '100px' }} />
//             <h3>Forgot Password</h3>
//           </div>
//           <form onSubmit={handleSendCode}>
//             <div className="mb-3">
//               <label htmlFor="phoneNumber" style={{ fontWeight: 'bold' }}>Phone Number</label>
//               <input
//                 type="tel"
//                 className="form-control mt-1"
//                 id="phoneNumber"
//                 placeholder="Enter Your Phone Number"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 required
//               />
//             </div>
//             <div id="recaptcha-container"></div>
//             {error && <div className="text-danger text-center">{error}</div>}
//             {message && <div className="text-success text-center">{message}</div>}
//             <div className="text-center">
//               <button
//                 type="submit"
//                 className="btn btn-primary"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? 'Sending...' : 'Send Code'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;



import React, { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/FirebaseConfig'; // Ensure Firebase is correctly initialized
import logo from '../Img/Company_logo.png';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: (response) => {
          handleSendCode(); // Call this when reCAPTCHA is solved
        },
        'expired-callback': () => {
          // Handle reCAPTCHA expiration if needed
        }
      },
      auth
    );
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      window.confirmationResult = confirmationResult; // Store confirmationResult globally

      setMessage('Verification code sent to your phone.');
      setError('');
      navigate('/verify-otp', { state: { phoneNumber } }); // Navigate to the OTP verification page
    } catch (err) {
      setError('Failed to send verification code. Please try again.');
      setMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="main-forgot-password">
      <div className="forgot-password-card">
        <div className="forgot-password-card-body">
          <div className="forgot-password-img-div">
            <img src={logo} alt="Logo" />
            <h3>Forgot Password</h3>
          </div>
          <form onSubmit={handleSendCode}>
            <div className="mb-3">
              <label htmlFor="phoneNumber" style={{ fontWeight: 'bold' }}>Phone Number</label>
              <input
                type="tel"
                className="form-control mt-1"
                id="phoneNumber"
                placeholder="Enter Your Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div id="recaptcha-container"></div>
            {error && <div className="text-danger text-center">{error}</div>}
            {message && <div className="text-success text-center">{message}</div>}
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Code'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
