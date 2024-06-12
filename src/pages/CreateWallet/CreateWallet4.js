import React, { useState, useEffect } from 'react';
import { Wallet, HDNodeWallet } from 'ethers';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import "./CreactWallet.css";

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

  return (
    <div className="wallet-container">
      <h2>{isOnboarding ? 'Create Wallet' : 'Login'}</h2>
      {isOnboarding ? (
        <>
          <div className="wallet-section">
            <button className="wallet-button" onClick={generateWallet}>Generate Mnemonic</button>
          </div>
          {mnemonic && (
            <div className="wallet-section">
              <h3>Mnemonic:</h3>
              <p className="wallet-mnemonic">{mnemonic}</p>
            </div>
          )}
          <div className="wallet-section">
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="wallet-input"
              />
            </label>
          </div>
          <div className="wallet-section">
            <button className="wallet-button" onClick={encryptPrivateKey}>Encrypt Private Key</button>
          </div>
        </>
      ) : (
        <div className="wallet-section">
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="wallet-input"
            />
          </label>
          <button className="wallet-button" onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default CreateWallet;
