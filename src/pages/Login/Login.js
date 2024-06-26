import React,{useState} from 'react';
import './Login.css';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    const storedPrivateKey = localStorage.getItem("encryptedPrivateKey");
    if (storedPrivateKey) {
      try {
        const decrypted = CryptoJS.AES.decrypt(
          storedPrivateKey,
          password
        ).toString(CryptoJS.enc.Utf8);
        if (decrypted) {
          alert("Login successful!");
          navigate("/home");
        } else {
          alert("Incorrect password.");
        }
      } catch (error) {
        alert("Incorrect password.");
      }
    } else {
      alert("No wallet found. Please complete the onboarding process.");
    }
  };

  return (
    <div className='login-wrapper'>
<div className="login-container">
      <div className="login-right">
        <h2>Log In</h2>
        <form>
          <div className="input-container">
            <label>Wallet Name</label>
            <input type="text" placeholder="Please enter your wallet name" className='logininput'/>
          </div>
          <div className="input-container">
            <label>Password</label>
            <input type="password" placeholder="Please enter your wallet password" className='logininput' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <button onClick={ () => handleLogin()} className="login-button">Enter</button>
        </form>

        <p onClick={()=>{navigate("/onboarding2")}}> <sapn>Don't have wallet? </sapn>Create wallet </p>
      </div>
    </div>
    </div>
    
  );
}

export default Login;
