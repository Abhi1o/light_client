// import React, { useState, useEffect } from "react";
// import { Wallet, HDNodeWallet } from "ethers";
// import CryptoJS from "crypto-js";
// import "./Onfj.scss";
// import Encryption from "../../Assets/Image/Encryption.gif";
// import { Link, useNavigate } from "react-router-dom";
// import { IoArrowBack } from "react-icons/io5";
// import { LuCopy, LuCopyCheck } from "react-icons/lu";

// const CreateWallet = ({ onNext }) => {
//   const navigate = useNavigate();
//   const [activeForm, setActiveForm] = useState("recovery");

//   const handleToggle = (form) => {
//     setActiveForm(form);
//   };

//   const [mnemonic, setMnemonic] = useState("");
//   const [password, setPassword] = useState("");
//   const [encryptedPrivateKey, setEncryptedPrivateKey] = useState("");
//   const [isOnboarding, setIsOnboarding] = useState(true);

//   const handleContinue = () => {
//     onNext();
//     navigate("/home");
//   };

//   useEffect(() => {
//     const storedPrivateKey = localStorage.getItem("encryptedPrivateKey");
//     setIsOnboarding(!storedPrivateKey);
//   }, []);

//   const generateWallet = () => {
//     const randomMnemonic = Wallet.createRandom().mnemonic.phrase;
//     setMnemonic(randomMnemonic);
//   };

//   const encryptPrivateKey = () => {
//     if (mnemonic && password) {
//       const wallet = HDNodeWallet.fromMnemonic(mnemonic);
//       const encrypted = CryptoJS.AES.encrypt(
//         wallet.privateKey,
//         password
//       ).toString();
//       setEncryptedPrivateKey(encrypted);
//       localStorage.setItem("encryptedPrivateKey", encrypted);
//       alert("Wallet created and private key encrypted successfully!");
//       onNext(); // Notify the parent component (App.js) to complete onboarding
//     } else {
//       alert("Please generate a mnemonic and set a password.");
//     }
//   };

//   const handleLogin = () => {
//     const storedPrivateKey = localStorage.getItem("encryptedPrivateKey");
//     if (storedPrivateKey) {
//       try {
//         const decrypted = CryptoJS.AES.decrypt(
//           storedPrivateKey,
//           password
//         ).toString(CryptoJS.enc.Utf8);
//         if (decrypted) {
//           alert("Login successful!");
//           navigate("/home");
//         } else {
//           alert("Incorrect password.");
//         }
//       } catch (error) {
//         alert("Incorrect password.");
//       }
//     } else {
//       alert("No wallet found. Please complete the onboarding process.");
//     }
//   };

//   const [step, setStep] = useState(0);

//   const handleNext = (nextStep) => setStep(nextStep);
//   const handleBack = () => setStep((prevStep) => prevStep - 1);

//   const options = [
//     {
//       title: "Budget Management",
//       description: "Keep track of your spending and stick to your budget.",
//     },
//     {
//       title: "Investment Tracking",
//       description: "Monitor your investments and stay on top of the market.",
//     },
//     {
//       title: "Expense Monitoring",
//       description: "Get detailed insights into your expenses.",
//     },
//     {
//       title: "Automated Payments",
//       description:
//         "Set up and automate your payments for hassle-free transactions.",
//     },
//     {
//       title: "Savings Goals",
//       description: "Define and achieve your savings targets with ease.",
//     },
//   ];

//   const [copied, setCopied] = useState(false);

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text).then(
//       () => {
//         setCopied(true);
//         setTimeout(() => setCopied(false), 3000); // Reset the copied state after 3 seconds
//       },
//       (err) => {
//         console.error("Could not copy text: ", err);
//       }
//     );
//   };

//   const renderCardContent = () => {
//     switch (step) {
//       case 0:
//         return (
//           <div className="create-wallet-card-content">
//             <h2>Get Started with Wallet Buddy</h2>
//             <p>
//               Unlock the power of AI to manage your finances effortlessly. With
//               Wallet Buddy, you'll experience seamless transactions and
//               unparalleled financial insights. Ready to revolutionize your
//               financial journey?
//             </p>
//             <button
//               className="create-wallet-primary-btn"
//               onClick={() => handleNext(1)}
//             >
//               Let’s embark on your financial adventure!
//             </button>
//           </div>
//         );
//       case 1:
//         return (
//           <div className="create-wallet-card-content">
//             <h2>Welcome to Wallet Buddy, your Personal AI Finance Manager!</h2>
//             <p>
//               Experience the future of financial management with Wallet Buddy.
//               Our interactive assistant is here to simplify your transactions
//               and make your financial life a breeze.
//             </p>
//             <button
//               className="create-wallet-primary-btn"
//               onClick={() => handleNext(2)}
//             >
//               Create New Wallet
//             </button>
//             <button
//               className="create-wallet-secondary-btn"
//               onClick={() => handleNext(3)}
//             >
//               Import Existing Wallet
//             </button>
//           </div>
//         );
//       case 2:
//         return (
//           <div className="create-wallet-card-content">
//             <h2>Ensure Maximum Security with Your Recovery Phrase</h2>
//             <p>
//               Your recovery phrase is your key to secure transactions. Choose
//               how you want to proceed:
//             </p>
//             <button
//               className="create-wallet-primary-btn"
//               onClick={() => {
//                 handleNext(4);
//                 generateWallet();
//               }}
//             >
//               Create New Recovery Phrase
//             </button>
//             <button
//               className="create-wallet-secondary-btn"
//               onClick={() => handleNext(5)}
//             >
//               Import Existing Recovery Phrase
//             </button>
//           </div>
//         );
//       case 3:
//         return (
//           <div className="create-wallet-card-content">
//             <h2>Import Your Wallet with a Recovery Phrase or Private Key</h2>
//             <p>
//               Easily import your wallet using a 12/24 word recovery phrase or
//               private key. Secure your financial future today!
//             </p>
//             <button
//               className="create-wallet-primary-btn"
//               onClick={() => handleNext(5)}
//             >
//               Use Recovery Phrase or Private Key
//             </button>
//           </div>
//         );
//       case 4:
//         return (
//           <div className="create-wallet-card-content">
//             <h2>Your Secure Recovery Phrase</h2>
//             <p>
//               Here is your unique recovery phrase. Store it in a safe place –
//               it's your key to accessing your wallet anytime, anywhere.
//             </p>
//             <div className="mnemonic-keys-container">
//               {mnemonic.split(" ").map((key, i) => (
//                 <p key={i} className="mnemonic-key">
//                   {key}
//                 </p>
//               ))}
//             </div>
//             <button onClick={() => copyToClipboard(mnemonic)}>
//               {copied ? <LuCopyCheck /> : <LuCopy />}
//             </button>
//             <button
//               className="create-wallet-primary-btn"
//               onClick={() => handleNext(6)}
//             >
//               Continue
//             </button>
//           </div>
//         );
//       case 5:
//         return (
//           <div className="create-wallet-card-content">
//             <h2>Enter Your Recovery Phrase or Private Key</h2>
//             <p>
//               Input your 12/24 word recovery phrase or private key to access
//               your wallet. Choose the method that works best for you.
//             </p>
//             <div className="toggle-form-container">
//               <div className="toggle-buttons">
//                 <button
//                   className={activeForm === "recovery" ? "active" : ""}
//                   onClick={() => handleToggle("recovery")}
//                 >
//                   Recovery Phrase
//                 </button>
//                 <button
//                   className={activeForm === "privateKey" ? "active" : ""}
//                   onClick={() => handleToggle("privateKey")}
//                 >
//                   Private Key
//                 </button>
//               </div>
//               {activeForm === "recovery" ? (
//                 <div className="recovery-form">
//                   {[...Array(12)].map((_, i) => (
//                     <input
//                       key={i}
//                       type="text"
//                       className="recovery-form-word"
//                       placeholder={`Word ${i + 1}`}
//                     />
//                   ))}
//                   <button className="create-wallet-primary-btn">Import</button>
//                 </div>
//               ) : (
//                 <div className="private-key-form">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter your private key here"
//                   />
//                   <button className="create-wallet-primary-btn">Import</button>
//                 </div>
//               )}
//             </div>
//           </div>
//         );
//       case 6:
//         return (
//           <div className="create-wallet-card-content">
//             <h2>Account Successfully Created!</h2>
//             <p>
//               Congratulations! Your account is set up and ready for
//               transactions. You’re now just a few steps away from effortless
//               financial management.
//             </p>
//             <button
//               className="create-wallet-primary-btn"
//               onClick={() => handleNext(7)}
//             >
//               Personalize
//             </button>
//           </div>
//         );
//       case 7:
//         return (
//           <div className="create-wallet-card-content">
//             <h2>Customize Your Wallet Buddy Experience</h2>
//             <p>
//               How would you like Wallet Buddy to assist you with your
//               transactions? Select an option that suits your needs:
//             </p>
//             <div className="options-list">
//               <h2>Options</h2>
//               <ul>
//                 {options.map((option, index) => (
//                   <li key={index} className="option-item">
//                     <input
//                       type="checkbox"
//                       className="checkbox"
//                       id={`option-${index}`}
//                     />
//                     <label htmlFor={`option-${index}`}>
//                       <h3>{option.title}</h3>
//                       <p>{option.description}</p>
//                     </label>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <button
//               className="create-wallet-primary-btn"
//               onClick={() => handleNext(8)}
//             >
//               Set Up Profile
//             </button>
//           </div>
//         );
//       case 8:
//         return (
//           <div className="create-wallet-card-content">
//             <h2>Complete Your Profile</h2>
//             <p>
//               Just a few more details to personalize your experience with Wallet
//               Buddy.
//             </p>
//             {/* <p>Name: Enter your full name.</p>
//             <p>Age: Enter your age.</p>
//             <p>Password: Create a secure password for your account.</p> */}
//             <input type="text" className="form-control" placeholder="Name" />
//             <input type="number" className="form-control" placeholder="Age" />
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Password"
//             />
//             <button
//               className="create-wallet-primary-btn"
//               onClick={handleContinue}
//             >
//               Finish
//             </button>{" "}
//             {/*onClick={() => navigate('/home')} onClick={handleContinue}  */}
//           </div>
//         );
//       default:
//         return (
//           <div className="create-wallet-card-content">
//             <h2>Get Started with Wallet Buddy</h2>
//             <p>
//               Unlock the power of AI to manage your finances effortlessly. With
//               Wallet Buddy, you'll experience seamless transactions and
//               unparalleled financial insights. Ready to revolutionize your
//               financial journey?
//             </p>
//             <button onClick={() => handleNext(1)}>
//               Let’s embark on your financial adventure!
//             </button>
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="login-container">
      
//       {step > 0 && (
//         <button className="Create-wallet-back-button" onClick={handleBack}>
//           <IoArrowBack />
//         </button>
//       )}

//       <div className="overlay"></div>
//       <div className="login-card">
//         <div className="login-card-content">
//           <h1>Create Wallet</h1>
//           {renderCardContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateWallet;
