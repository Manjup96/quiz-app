// import React, { useState } from 'react';
// import { db, auth } from '../Firebase/FirebaseConfig';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import logo from "../Img/Company_logo.png" ; 

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {

//       const userCredential = await auth.createUserWithEmailAndPassword(email, password);
//       const user = userCredential.user;

     
//       await db.collection('users').doc(user.uid).set({
//         name,
//         email,
//         password,
//         createdAt: new Date(),
//       });

     
//       setName('');
//       setEmail('');
//       setPassword('');
//       setError('');
//       setIsSubmitting(false);


//       alert('You have Registered successfully!');
//       navigate('/'); 
//     } catch (err) {
//       setError(err.message);
//       setIsSubmitting(false);
//     }
//   };

//   const canSubmit = name.trim() !== '' && email.trim() !== '' && password.trim() !== '';

//   return (
//     <div className="d-flex justify-content-center align-items-center mt-5 pt-5">
//       <div className="card" style={{ width: '36rem' }}>
//         <div className="card-body">
//           <div className="text-center mb-4">
//             <img src={logo} alt="Logo" className="mb-3" style={{ width: '250px', height: '100px' }} />
//             <h3>Register</h3>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label htmlFor="name" style={{ fontWeight: 'bold' }}>Name</label>
//               <input
//                 type="text"
//                 className="form-control mt-1"
//                 id="name"
//                 placeholder="Enter Your Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="email" style={{ fontWeight: 'bold' }}>Email</label>
//               <input
//                 type="email"
//                 className="form-control mt-1"
//                 id="email"
//                 placeholder="Enter Your Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3 position-relative">
//               <label htmlFor="password" style={{ fontWeight: 'bold' }}>Password</label>
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 className="form-control mt-1"
//                 id="password"
//                 placeholder="Enter Your Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <FontAwesomeIcon
//                 icon={showPassword ? faEyeSlash : faEye}
//                 onClick={togglePasswordVisibility}
//                 className="position-absolute"
//                 style={{ right: '10px', top: '37px', cursor: 'pointer' }}
//               />
//             </div>
//             {error && <div className="text-danger text-center">{error}</div>}
//             <div className="text-center">
//               <button
//                 type="submit"
//                 className="btn btn-primary"
//                 disabled={!canSubmit || isSubmitting}
//               >
//                 {isSubmitting ? 'Registering...' : 'Register'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;





// import React, { useState } from 'react';
// import { db, auth } from '../Firebase/FirebaseConfig';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import logo from "../Img/Company_logo.png"; 
// // import './SignUp.css';


// const SignUp = () => {
//   const navigate = useNavigate();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [error, setError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const userCredential = await auth.createUserWithEmailAndPassword(email, password);
//       const user = userCredential.user;

//       await db.collection('users').doc(user.uid).set({
//         name,
//         email,
//         mobile,
//         password,
//         createdAt: new Date(),
//       });

//       setName('');
//       setEmail('');
//       setPassword('');
//       setMobile('');
//       setError('');
//       setIsSubmitting(false);

//       alert('You have registered successfully!');
//       navigate('/'); 
//     } catch (err) {
//       setError(err.message);
//       setIsSubmitting(false);
//     }
//   };

//   const canSubmit = name.trim() !== '' && email.trim() !== '' && password.trim() !== '' && mobile.trim() !== '';

//   return (
//     <div className="main d-flex justify-content-center align-items-center mt-5 pt-5">
//       <div className="card" style={{ width: '36rem' }}>
//         <div className="card-body">
//           <div className="text-center mb-4">
//             <img src={logo} alt="Logo" className="mb-3" style={{ width: '250px', height: '100px' }} />
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label htmlFor="name" style={{ fontWeight: 'bold' }}>Name</label>
//               <input
//                 type="text"
//                 className="form-control mt-1"
//                 id="name"
//                 placeholder="Enter Your Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="email" style={{ fontWeight: 'bold' }}>Email</label>
//               <input
//                 type="email"
//                 className="form-control mt-1"
//                 id="email"
//                 placeholder="Enter Your Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="mobile" style={{ fontWeight: 'bold' }}>Mobile Number</label>
//               <input
//                 type="tel"
//                 className="form-control mt-1"
//                 id="mobile"
//                 placeholder="Enter Your Mobile Number"
//                 value={mobile}
//                 onChange={(e) => setMobile(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3 position-relative">
//               <label htmlFor="password" style={{ fontWeight: 'bold' }}>Password</label>
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 className="form-control mt-1"
//                 id="password"
//                 placeholder="Enter Your Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <FontAwesomeIcon
//                 icon={showPassword ? faEyeSlash : faEye}
//                 onClick={togglePasswordVisibility}
//                 className="position-absolute"
//                 style={{ right: '10px', top: '37px', cursor: 'pointer' }}
//               />
//             </div>
//             {error && <div className="text-danger text-center">{error}</div>}
//             <div className="text-center">
//               <button
//                 type="submit"
//                 className="btn btn-primary"
//                 disabled={!canSubmit || isSubmitting}
//               >
//                 {isSubmitting ? 'Registering...' : 'Sign Up'}
//               </button>
//             </div>
//             <div className="text-center mt-3">
//               <a
//                 onClick={() => navigate('/forgot-password')}
//                 style={{ textDecoration: 'none', color: '#007bff', cursor: 'pointer' }}
//               >
//                 Forgot Password?
//               </a>
//             </div>
//             <div className="text-center mt-2">
//               <p>
//                 <a
//                   onClick={() => navigate('/')}
//                   style={{ textDecoration: 'none', color: '#007bff', cursor: 'pointer', padding: '0' }}
//                 >
//                   &nbsp;Sign In
//                 </a>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;



// import React, { useState } from 'react';
// import { db, auth } from '../Firebase/FirebaseConfig';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { faEye, faEyeSlash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
// import logo from "../Img/main-logo.png"; 
// import './SignUp.css';


// const SignUp = () => {
//   const navigate = useNavigate();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [error, setError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const userCredential = await auth.createUserWithEmailAndPassword(email, password);
//       const user = userCredential.user;

 
     
      

//       await db.collection('users').doc(user.uid).set({
//         name,
//         email,
//         mobile,
//         password,
//         createdAt: new Date(),
//       });

//       setName('');
//       setEmail('');
//       setPassword('');
//       setMobile('');
//       setError('');
//       setIsSubmitting(false);

//       alert('You have registered successfully!');
//       navigate('/'); 
//     } catch (err) {
//       setError(err.message);
//       setIsSubmitting(false);
//     }
//   };

//   const canSubmit = name.trim() !== '' && email.trim() !== '' && password.trim() !== '' && mobile.trim() !== '';

//   return (
//     <div className="signup-main">
//       <div className="signup-card">
//         <div className="signup-card-body">
//           <div className="signup-img-div">
//             <img src={logo} alt="Logo" />
//           </div>
//           <form  className='signup-form' onSubmit={handleSubmit}>
//             <div className='signup_position_relative'>
//               <input
//                 type="email"
//                 id="signup_email"
//                 placeholder="Enter Your Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//                 <span className="info-icon" data-tooltip="The email that you used during the sign up process.">
//                 <FontAwesomeIcon icon={faInfoCircle} />
//               </span> 
//             </div>
//             <div className='signup_position_relative'>
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 id="signup_password"
//                 placeholder="Enter Your Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//                <span className="info-icon" data-tooltip="Your password must be at least 8 characters long.">
//                 <FontAwesomeIcon icon={faInfoCircle} />
//               </span>
             
//             </div>
//             {error && <div className="text-danger text-center">{error}</div>}
//             <div className=" button-main">
//               <button
//                 type="submit"
//                 className="btn-sub"
//                 disabled={!canSubmit || isSubmitting}
//                 onClick={() => navigate('/')}
//               >
//                 {isSubmitting ? 'Registering...' : 'Sign Up'}
//               </button>
//             </div>
//             <div className=" forgot-password">
//               <a
//                 onClick={() => navigate('/forgot-password')}
//               >
//                 Forgot Password?
//               </a>
//             </div>
//             <div className=" sign-up-text">
//               <p>
//                 <a
//                   onClick={() => navigate('/')}
//                 >
//                   &nbsp;Sign In
//                 </a>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from 'react';
import { db, auth } from '../Firebase/FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import logo from "../Img/main-logo.png"; 
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
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

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      await db.collection('users').doc(user.uid).set({
        name,
        email,
        mobile,
        createdAt: new Date(),
      });

      setName('');
      setEmail('');
      setPassword('');
      setMobile('');
      setError('');
      setIsSubmitting(false);

      alert('You have registered successfully!');
      navigate('/'); 
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  const canSubmit = name.trim() !== '' && email.trim() !== '' && password.trim() !== '' && mobile.trim() !== '';

  return (
    <div className="signup-main">
      <div className="signup-card">
        <div className="signup-card-body">
          <div className="signup-img-div">
            <img src={logo} alt="Logo" />
          </div>
          <form className='signup-form' onSubmit={handleSubmit}>
            {/* <div className='signup_position_relative'>
              <input
                type="text"
                id="signup_name"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <span className="info-icon" data-tooltip="Your full name.">
                <FontAwesomeIcon icon={faInfoCircle} />
              </span>
            </div> */}
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
            {/* <div className='signup_position_relative'>
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
            </div> */}
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

