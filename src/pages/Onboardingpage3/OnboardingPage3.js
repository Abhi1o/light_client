import React from 'react';
import './OnboardingPage3.css';
import { FcGoogle } from "react-icons/fc";
import loginEncryptions from "../../Assets/Image/cyber-security.webp";
const OnboardingPage3 = ({ onNext }) => {
  return (
    <div className="login-container">
    <div className="overlay"></div>
    <div className="login-card">
      <img src={loginEncryptions} alt="Logo" className="logo" />
      
      <button className="create-account-button">Create a new Wallet </button>
      <button className="create-account-button">Import an existing Wallet</button>
      
      
      <p className='have-account-text'>
        Connect Hardware <a href="/login">Wallet</a>
      </p>
      {/* <p>
      &#169; Light 2024 {' '}
        <a href="/terms">All right reserved</a> {' '}
        .
      </p> */}
      
    </div>
  

      {/* <div className="onboarding-content">
        <h1>Secure Your Wallet</h1>
        <p>Set up security features to protect your wallet:</p>
        <ul>
          <li>Set a PIN code</li>
          <li>Enable biometric authentication</li>
          <li>Configure 2-factor authentication (2FA)</li>
        </ul>
        <button onClick={onNext}>Finish</button>
      </div> */}
    </div>
  );
};

export default OnboardingPage3;
