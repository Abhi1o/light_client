import React from 'react';
import './OnboardingPage3.scss';

import { Link, useNavigate } from 'react-router-dom';
import Encryption from "../../Assets/Image/Encryption.gif";
const OnboardingPage3 = ({ onNext }) => {

  const navigate = useNavigate();

  const handleContinue = () => {
    onNext();
    navigate('/home');
  };
  return (
    <div className="login-container">
    <div className="overlay"></div>
    <div className="login-card">
      {/* <img src={Encryption} alt="Logo" className="Onboarding3-logo" />
       */}
      <h1>Create Wallet</h1>
      <p>Unlock the power of AI to manage your 
        <br/>finances effortlessly. </p>
      <input type="Email" name="email" value="" placeholder='Email' className='create-wallet-email '/>
      <input type="Password" name="password" value="" placeholder="Password" className='create-wallet-password '/>


      <Link to="/createwallet" className="create-account-link"><button className="create-account-button">Create a new Wallet </button></Link>
      {/* <button className="create-account-button">Import an existing Wallet</button> */}
      
      
      <p className='have-account-text'>
        Connect Hardware <a href="/login">Wallet</a>
      </p>
      {/* <button className="create-account-button finish" onClick={handleContinue}>Finish</button> */}
      
      
    </div>
  

      
    </div>
  );
};

export default OnboardingPage3;
