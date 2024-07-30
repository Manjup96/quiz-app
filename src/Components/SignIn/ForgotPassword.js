// import React, { useState } from 'react';
// import { sendPasswordResetEmail } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
// import { auth } from '../Firebase/FirebaseConfig'; // Ensure Firebase is correctly initialized
// import logo from '../Img/main-logo.png';
// import { FaInfoCircle } from 'react-icons/fa'; // Import the icon
// import { Tooltip } from 'react-tooltip'; // Import Tooltip
// import 'react-tooltip/dist/react-tooltip.css'; // Import Tooltip CSS
// import '../Styles/ForgotPassword.css';

// const ForgotPassword = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSendEmail = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       await sendPasswordResetEmail(auth, email);
//       setMessage('Password reset sent to your email.');
//       setError('');
//       alert('Password reset sent to your email.');
//       navigate('/'); 
//     } catch (err) {
//       setError('Failed to send password reset email. Please try again.');
//       setMessage('');
//       alert('Failed to send password reset email. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="main-forgot-password">
//       <div className="forgot-password-card">
//         <div className="card forgot-card">
//           <div className="forgot-password-card-body">
//             <div className="forgot-password-img-div mt-2">
//               <img src={logo} alt="Logo" />
//             </div>
//             <form onSubmit={handleSendEmail}>
//               <div className="mb-3 input-group">
//                 <input
//                   type="email"
//                   className="form-control email-input mt-4"
//                   id="email"
//                   placeholder="Enter Your Email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//                 <div
//                   className="input-icon"
//                   data-tooltip-id="email-tooltip"
//                   data-tooltip-content="The email that you used during the sign-up process."
//                 >
//                   <FaInfoCircle />
//                 </div>
//                 <Tooltip id="email-tooltip" place="top" effect="solid" className="custom-tooltip" />
//               </div>
//               {error && <div className="text-danger text-center">{error}</div>}
//               {message && <div className="text-success text-center">{message}</div>}
//               <div className="text-center">
//                 <button
//                   type="submit"
//                   className="btn-success send-button"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? 'Sending...' : 'Send Email'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;





import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/FirebaseConfig'; // Ensure Firebase is correctly initialized
import logo from '../Img/main-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip'; // Import Tooltip
import 'react-tooltip/dist/react-tooltip.css'; // Import Tooltip CSS
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
              <img src={logo} alt="Logo" />
            </div>
            <form onSubmit={handleSendEmail}>
              <div className="mb-3 forgot-position-relative">
                <input
                  type="email"
                  className="form-control email-input mt-4"
                  // id="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <span className="forgot-info-icon" data-tooltip="The email that you used during the sign up process.">
                  <FontAwesomeIcon icon={faInfoCircle} />
                </span>

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
