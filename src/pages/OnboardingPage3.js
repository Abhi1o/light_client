import React from 'react';
import '../css/OnboardingPage3.css';

const OnboardingPage3 = ({ onNext }) => {
  return (
    <div className="onboarding-container3">
       <div className="login-container">
      <div className="left-section">
        <img src="left-side-image.png" alt="Left Side" />
      </div>
      <div className="right-section">
        <div className="login-card">
          <img src="logo.png" alt="Logo" className="logo" />
          <h1>Create account</h1>
          <input type="email" placeholder="Email address" />
          <div className="password-container">
            <input type="password" placeholder="Password" />
            <span className="password-toggle">👁</span>
          </div>
          <button className="create-account-button">Create account</button>
          <p>or sign up with</p>
          <div className="social-login">
            <button className="social-button google">G</button>
            <button className="social-button microsoft">M</button>
            <button className="social-button github">H</button>
          </div>
          <p>
            By creating an account you agree to Messimo's{' '}
            <a href="/terms">Terms of Services</a> and{' '}
            <a href="/privacy">Privacy Policy</a>.
          </p>
          <p>
            Have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </div>
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
