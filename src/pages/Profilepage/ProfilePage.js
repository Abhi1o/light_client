import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const ProfilePage = () => {
//   const [mnemonic, setMnemonic] = useState("");
//   const [publicKey, setPublicKey] = useState("");
//   const [privateKey, setPrivateKey] = useState("");
//   const [name, setName] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedPrivateKey = localStorage.getItem("encryptedPrivateKey");
//     const storedName = localStorage.getItem("username");
//     const password = prompt("Please enter your password to decrypt your private key:");

//     if (storedPrivateKey && password) {
//       try {
//         const decryptedPrivateKey = CryptoJS.AES.decrypt(storedPrivateKey, password).toString(CryptoJS.enc.Utf8);
//         if (decryptedPrivateKey) {
//           setPrivateKey(decryptedPrivateKey);
//           // Assuming you have a function to derive public key and mnemonic from private key
//           const { derivedPublicKey, derivedMnemonic } = derivePublicKeyAndMnemonic(decryptedPrivateKey);
//           setPublicKey(derivedPublicKey);
//           setMnemonic(derivedMnemonic);
//           setName(storedName);
//         } else {
//           alert("Incorrect password.");
//           navigate("/login");
//         }
//       } catch (error) {
//         alert("Incorrect password.");
//         navigate("/login");
//       }
//     } else {
//       alert("No wallet found. Please complete the onboarding process.");
//       navigate("/onboarding");
//     }
//   }, [navigate]);

//   const derivePublicKeyAndMnemonic = (privateKey) => {
//     // Add your logic here to derive public key and mnemonic from private key
//     return {
//       derivedPublicKey: "derivedPublicKey",
//       derivedMnemonic: "derivedMnemonic",
//     };
//   };

//   return (
//     <div className="profile-page">
//       <div className="profile-container">
//         <img src="profile-pic-placeholder.png" alt="Profile" className="profile-pic" />
//         <h1>{name}</h1>
//         <div className="details">
//           <p><strong>Public Key:</strong> {publicKey}</p>
//           <p><strong>Private Key:</strong> {privateKey}</p>
//           <p><strong>Mnemonic:</strong> {mnemonic}</p>
//         </div>
//       </div>
//     </div>
const [onboarding, setOnboarding]= useState(null);
const [mnemonic, setMnemonic] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [name, setName] = useState("");
  const [isPrivateMode, setIsPrivateMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onboardingStatus = localStorage.getItem("onboardingComplete");
    setOnboarding(onboardingStatus === "true");
    const storedPrivateKey = localStorage.getItem("encryptedPrivateKey");
    const storedName = localStorage.getItem("username");
    const password = prompt("Please enter your password to decrypt your private key:");

    if (storedPrivateKey && password) {
      try {
        const decryptedPrivateKey = CryptoJS.AES.decrypt(storedPrivateKey, password).toString(CryptoJS.enc.Utf8);
        if (decryptedPrivateKey) {
          setPrivateKey(decryptedPrivateKey);
          const { derivedPublicKey, derivedMnemonic } = derivePublicKeyAndMnemonic(decryptedPrivateKey);
          setPublicKey(derivedPublicKey);
          setMnemonic(derivedMnemonic);
          setName(storedName);
        } else {
          alert("Incorrect password.");
          localStorage.setItem("onboardingComplete", "false");
          setOnboarding(false);
          navigate("/login");
          
        }
      } catch (error) {
        alert("Incorrect password.");
        localStorage.setItem("onboardingComplete", "false");
    setOnboarding(false);
     navigate("/login");
      }
    } else {
      alert("No wallet found. Please complete the onboarding process.");
      localStorage.setItem("onboardingComplete", "false");
    setOnboarding(false);
      navigate("/onboarding2");
    }
  }, [navigate]);

  const derivePublicKeyAndMnemonic = (privateKey) => {
    // Add your logic here to derive public key and mnemonic from private key
    return {
      derivedPublicKey: "publicKeyDerivedFromPrivateKey",
      derivedMnemonic: "mnemonicDerivedFromPrivateKey",
    };
  };

  const togglePrivateMode = () => {
    setIsPrivateMode(!isPrivateMode);
  };

  return (
    <div className=" profile-wrapper">
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <img src="profile-pic-placeholder.png" alt="Profile" className="profile-pic" />
          <div>
            <h1>{name}</h1>
            <p><strong>Public Key:</strong> {isPrivateMode ? "********" : publicKey}</p>
          </div>
          <button className="private-mode-btn" onClick={togglePrivateMode}>
            {isPrivateMode ? "Private Mode: On" : "Private Mode: Off"}
          </button>
        </div>
        <div className="details">
          <p><strong>Private Key:</strong> {isPrivateMode ? "********" : privateKey}</p>
          <p><strong>Mnemonic:</strong> {isPrivateMode ? "********" : mnemonic}</p>
          <p><strong>Available Value:</strong> $8.84</p>
        </div>
        <button className="manage-account-btn">Manage Account</button>
      </div>
    </div>
    </div>
  );
};

export default ProfilePage;
