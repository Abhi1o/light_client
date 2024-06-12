import React, { useState, useEffect } from 'react';
import { Wallet, HDNodeWallet } from 'ethers';
import CryptoJS from 'crypto-js';
import { Link, useNavigate } from 'react-router-dom';
import './Wallet.scss';
import Encryption from "../../Assets/Image/Encryption.gif";

const CreateWallet = ({ onNext }) => {
  const [mnemonic, setMnemonic] = useState('');
  const [password, setPassword] = useState('');
  const [encryptedPrivateKey, setEncryptedPrivateKey] = useState('');
  const [isOnboarding, setIsOnboarding] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPrivateKey = localStorage.getItem('encryptedPrivateKey');
    setIsOnboarding(!storedPrivateKey);
  }, []);

  const generateWallet = () => {
    const randomMnemonic = Wallet.createRandom().mnemonic.phrase;
    setMnemonic(randomMnemonic);
  };

  const encryptPrivateKey = () => {
    if (mnemonic && password) {
      const wallet = HDNodeWallet.fromMnemonic(mnemonic);
      const encrypted = CryptoJS.AES.encrypt(wallet.privateKey, password).toString();
      setEncryptedPrivateKey(encrypted);
      localStorage.setItem('encryptedPrivateKey', encrypted);
      alert('Wallet created and private key encrypted successfully!');
      onNext();  // Notify the parent component (App.js) to complete onboarding
    } else {
      alert('Please generate a mnemonic and set a password.');
    }
  };

  const handleLogin = () => {
    const storedPrivateKey = localStorage.getItem('encryptedPrivateKey');
    if (storedPrivateKey) {
      try {
        const decrypted = CryptoJS.AES.decrypt(storedPrivateKey, password).toString(CryptoJS.enc.Utf8);
        if (decrypted) {
          alert('Login successful!');
          navigate('/home');
        } else {
          alert('Incorrect password.');
        }
      } catch (error) {
        alert('Incorrect password.');
      }
    } else {
      alert('No wallet found. Please complete the onboarding process.');
    }
  };

  const handleContinue = () => {
    onNext();
    navigate('/home');
  };
  return (
    <div className="wallet-container">
    <div className="overlay"></div>
    <div className="wallet-card">
      <img src={Encryption} alt="Logo" className="Onboarding3-logo" />
      
      <h2>{isOnboarding ? 'Create Wallet' : 'Login'}</h2>
      {isOnboarding ? (
        <>
          <div className="wallet-section">
            <button className="generate-mnemonic-button" onClick={generateWallet}>Generate Mnemonic</button>
          </div>
          {mnemonic && (
            <div className="wallet-section">
              <h3>Mnemonic:</h3>
              <p className="wallet-mnemonic">{mnemonic}</p>
            </div>
          )}
          <div className="wallet-section">
            <label>
             
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="wallet-input"
                placeholder='Password'
              />
            </label>
          </div>
          <div className="wallet-section">
            <button className="encrypt-private-button" onClick={encryptPrivateKey}>Encrypt Private Key</button>
          </div>
          <button className="generate-mnemonic-button finish" onClick={handleContinue}>Next</button>

        </>
      ) : (
        <div className="wallet-section">
          <label>
            
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="wallet-input"
              placeholder='Password'
            />
          </label>
          <button className="wallet-button" onClick={handleLogin}>Login</button>
        </div>
      )}
      
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

export default CreateWallet;
