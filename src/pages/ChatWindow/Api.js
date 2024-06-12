import React, { useState } from 'react';

const GenerateComponent = () => {
  const [userInput, setUserInput] = useState('');
  const [seedPhrase, setSeedPhrase] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    try {
      const response = await fetch('https://silver-worlds-press.loca.lt/generate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          user_input: "send 1 ATOM from my address to cosmos12i203i1203i02i013 address index 12",
          seed_phrase: "law grab theory better athlete submit awkward hawk state wedding wave monkey audit blame fury wood tag rent furnace exotic jeans drift destroy style"
        }),
        credentials: 'include'  // Ensure credentials are included if needed
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>chat</h1>
      
 
      
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter user input"
      />
      <input
        type="text"
        value={seedPhrase}
        onChange={(e) => setSeedPhrase(e.target.value)}
        placeholder="Enter seed phrase"
      />
      <button onClick={handleGenerate}>Generate</button>
      
      {result && <div>Result: {result}</div>}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
    </div>
  );
};

export default GenerateComponent;