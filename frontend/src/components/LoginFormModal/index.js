// import React, { useState } from 'react';
// import * as sessionActions from '../../store/session';
// import { useDispatch } from 'react-redux';
// import { useModal } from '../../context/Modal';
// import './LoginForm.css';

// export default function LoginFormModal() {
//   const dispatch = useDispatch();
//   const [credential, setCredential] = useState('');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState([]);
//   const { closeModal } = useModal();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrors([]);
//     return dispatch(sessionActions.login({ credential, password }))
//       .then(closeModal)
//       .catch(async (res) => {
//         const data = await res.json();
//         if (data && data.errors) setErrors(data.errors);
//       });
//   };

//   return (
//     <div className="login-container">
//       <form onSubmit={handleSubmit}>
//         <div className="modalHead">Welcome !</div>
//         <ul>
//           {errors.map((error, idx) => (
//             <div style={{ color: 'red' }} key={idx}>
//               {error}
//             </div>
//           ))}
//         </ul>
//         <div className="form-wrapper">
//           <label className="login-text">
//             Username or Email
//             <div>
//               <input
//                 type="text"
//                 value={credential}
//                 onChange={(e) => setCredential(e.target.value)}
//                 required
//               />
//             </div>
//           </label>
//           <label className="login-text">
//             Password
//             <div>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//           </label>
//         </div>
//         <button className="modal-submit-button" type="submit">
//           Log In
//         </button>
//       </form>
//     </div>
//   );
// }

// // export default LoginFormModal;
// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormModal;
