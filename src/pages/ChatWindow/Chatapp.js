import React, { useState, useEffect, useRef } from "react";
import "./Chatapp.scss";

import { BiSend } from "react-icons/bi";

import atomSuccessImage from "../../Assets/Image/AtomSuccess1.jpg";

import chainConfig from './config';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { SigningStargateClient } from "@cosmjs/stargate";

const Sidebar = ({
  chats,
  onSelectChat,
  onStartNewChat,
  toggleCategory,
  expandedCategories,
}) => {
  return (
    <div className="chat-sidebar">
      <h2>Chats</h2>
      <button className="new-chat-button" onClick={onStartNewChat}>
        <i className="bx bx-edit-alt"></i>
      </button>
      <div></div>
      {["Today", "Yesterday", "Previous 7 Days"].map((dateCategory) => (
        <div key={dateCategory} className="chat-tile">
          <h6
            className="date-category"
            onClick={() => toggleCategory(dateCategory)}
          >
            <i className="arrow-icon">
              {/* <MdKeyboardArrowDown />
              <MdOutlineKeyboardArrowRight /> */}
            </i>
            {dateCategory}
          </h6>

          {expandedCategories.includes(dateCategory) && (
            <div className="chat-list">
              {chats
                .filter((chat) => chat.date === dateCategory)
                .map((chat, index) => (
                  <div
                    key={index}
                    className="chat-card"
                    onClick={() => onSelectChat(chat)}
                  >
                    <div className="chat-title">
                      {chat.title.substring(0, 25) + "..."}
                    </div>
                    <div className="menu-icon">•••</div>
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const testing = async (input, mnemonic, chainConfig) => {
    function extractFunctionFromResponse(response) {
      const generatedText = response[0].generated_text;
    
      // Check if the generated text contains an async function
      const asyncKeywordIndex = generatedText.indexOf('async');
      const assistantKeywordIndex = generatedText.indexOf('<assistant>:');
    
      if (asyncKeywordIndex !== -1 && asyncKeywordIndex > assistantKeywordIndex) {
        // Extract the function code starting from 'async' to 'return result.transactionHash;'
        const functionStart = generatedText.indexOf('async', assistantKeywordIndex);
        const functionEnd = generatedText.indexOf('return result.transactionHash;') + 'return result.transactionHash;'.length;
    
        const functionCode = generatedText.substring(functionStart, functionEnd) + '\n}';

        const dynamicFunction = eval(`(${functionCode})`);
      
        // Define the CORS proxy URL (change to your local proxy URL)
        const proxyUrl = 'http://localhost:8080/';
        console.log("after dynamic function");
    
        // Wrap the original function to use the CORS proxy
        const proxyFunction = async (DirectSecp256k1HdWallet, SigningStargateClient, mnemonic, chainConfig) => {
          console.log("inside proxy function"); 
          const originalFetch = window.fetch;
          window.fetch = (url, options) => {
            if (url.startsWith('https://cosmos-rpc.quickapi.com')) {
              url = proxyUrl + url;
            }
            return originalFetch(url, options);
          };
          try {
            console.log('inside try proxy function');
            return await dynamicFunction(DirectSecp256k1HdWallet, SigningStargateClient, mnemonic, chainConfig);
          } finally {
            window.fetch = originalFetch;
          }
        };
    
        // Execute the proxy function with the necessary parameters
        
        const result = proxyFunction(DirectSecp256k1HdWallet, SigningStargateClient, mnemonic, chainConfig);
        
        return result
        // Return the extracted function code
        
      }
    
      // If no async function is found, return the original generated text
      return generatedText;
    }
    const url = "https://88db-18-213-200-192.ngrok-free.app/predict";
    const payload = {
      inputs: `<human>:${input} <assistant>:`
    };
    
    const headers = {
      "Content-Type": "application/json"
    };
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload)
      });
      const data = await response.json();
  
      console.log("This is the output in json formate", data);
      const extractedFunction = await extractFunctionFromResponse(data);
      console.log("extract function", extractedFunction);
      // Create a dynamic function from the function body
      console.log("before dynamic function");
      return extractedFunction;
  
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };
  

// const testing = async (input, mnemonic, chainConfig) => {
//   function extractFunctionFromResponse(response) {
//     const generatedText = response[0].generated_text;
  
//     // Check if the generated text contains an async function
//     const asyncKeywordIndex = generatedText.indexOf('async');
//     const assistantKeywordIndex = generatedText.indexOf('<assistant>:');
  
//     if (asyncKeywordIndex !== -1 && asyncKeywordIndex > assistantKeywordIndex) {
//       // Extract the function code starting from 'async' to 'return result.transactionHash;'
//       const functionStart = generatedText.indexOf('async', assistantKeywordIndex);
//       const functionEnd = generatedText.indexOf('return result.transactionHash;') + 'return result.transactionHash;'.length;
  
//       const functionCode = generatedText.substring(functionStart, functionEnd) + '\n}';
  
//       // Return the extracted function code
//       return functionCode;
//     }
  
//     // If no async function is found, return the original generated text
//     return generatedText;
//   }
//   const url = "https://88db-18-213-200-192.ngrok-free.app/predict";
//   const payload = {
//     inputs: `<human>:${input} <assistant>:`
//   };
  
//   const headers = {
//     "Content-Type": "application/json"
//   };
  
//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: headers,
//       body: JSON.stringify(payload)
//     });
//     const data = await response.json();

//     console.log("This is the output in json formate", data);
//     const extractedFunction = await extractFunctionFromResponse(data);
//     console.log("extract function", extractedFunction);
//     // Create a dynamic function from the function body
//     console.log("before dynamic function");
//     const dynamicFunction = await eval(`(${extractedFunction})`);
    
//     // Define the CORS proxy URL (change to your local proxy URL)
//     const proxyUrl = 'http://localhost:8080/';
//     console.log("after dynamic function");

//     // Wrap the original function to use the CORS proxy
//     const proxyFunction = async (DirectSecp256k1HdWallet, SigningStargateClient, mnemonic, chainConfig) => {
//       console.log("inside proxy function"); 
//       const originalFetch = window.fetch;
//       window.fetch = (url, options) => {
//         if (url.startsWith('https://cosmos-rpc.quickapi.com')) {
//           url = proxyUrl + url;
//         }
//         return originalFetch(url, options);
//       };
//       try {
//         console.log('inside try proxy function');
//         return await dynamicFunction(DirectSecp256k1HdWallet, SigningStargateClient, mnemonic, chainConfig);
//       } finally {
//         window.fetch = originalFetch;
//       }
//     };

//     // Execute the proxy function with the necessary parameters
    
//     const result = await proxyFunction(DirectSecp256k1HdWallet, SigningStargateClient, mnemonic, chainConfig);
//     const result1 = result
//     return result1

//   } catch (error) {
//     console.error("Error:", error);
//     return null;
//   }
// };

// const testing = async (mnemonic, chainConfig) => {
//   try {
//     const response = await axios.post("http://localhost:5000/send-tx");
//     const functionBody = response.data;

//     // Create a dynamic function from the function body
//     const dynamicFunction = eval(`(${functionBody})`);

//     // Define the CORS proxy URL (change to your local proxy URL)
//     const proxyUrl = 'http://localhost:8080/';

//     // Wrap the original function to use the CORS proxy
//     const proxyFunction = async (DirectSecp256k1HdWallet, SigningStargateClient, mnemonic, chainConfig) => {
//       const originalFetch = window.fetch;
//       window.fetch = (url, options) => {
//         if (url.startsWith('https://cosmos-rpc.quickapi.com')) {
//           url = proxyUrl + url;
//         }
//         return originalFetch(url, options);
//       };
//       try {
//         return await dynamicFunction(DirectSecp256k1HdWallet, SigningStargateClient, mnemonic, chainConfig);
//       } finally {
//         window.fetch = originalFetch;
//       }
//     };

//     // Execute the proxy function with the necessary parameters
    
//     const result = await proxyFunction(DirectSecp256k1HdWallet, SigningStargateClient, mnemonic, chainConfig);
//     const result1 = result
//     return result1
//   } 
//   catch (error) {
//     console.error("Error executing transaction:", error);
//     throw error;
//   }
// };



//
// const testing = async (mnemonic, chainConfig) => {
//   try {
//     const response = await axios.post("http://localhost:5000/send-tx");
// // console.log("beforeresponse1", response);

//     const functionBody = response.data;
//     // console.log("after addfunctionstring2",addFunctionString);
    

//     // const addFunction = new Function('mnemonic', 'chainConfig', addFunctionString);
//     const dynamicFunction = eval(`(${functionBody})`);
//     console.log("after addfunction3", dynamicFunction);

//     // Execute the dynamic function
//     const result = await dynamicFunction(DirectSecp256k1HdWallet, SigningStargateClient, mnemonic, chainConfig);
//     // 
//     console.log("result @@@@4",result);

//     return result;
//   } catch (error) {
//     console.error("Error executing transaction:", error);
//     throw error;
//   }
// };


const ChatWindow = ({ chat }) => {
  const [copy, setCopy] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Connecting to network...");
  const messagesEndRef = useRef(null);

  const loadingMessages = [
    "Connecting to network...",
    "Connected to Cosmos...",
    "Verifying details...",
    "Processing transaction...",
    "Finalizing transaction...",
    "Transaction in progress..."
  ];


  useEffect(() => {
    if (loading) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        setLoadingText(loadingMessages[currentIndex]);
        if (currentIndex < loadingMessages.length - 1) {
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [loading,loadingMessages]);

  // useEffect(() => {
  //   if (loading) {
  //     const interval = setInterval(() => {
  //       setLoadingText(prevText => {
  //         const currentIndex = loadingMessages.indexOf(prevText);
  //         const nextIndex = (currentIndex + 1) % loadingMessages.length;
  //         return loadingMessages[nextIndex];
  //       });
  //     }, 2000);
  //     return () => clearInterval(interval);
  //   }
  // }, [loading]);

// chat api
// const handletransaction = ()=>{
//   const fetch = require('node-fetch');
//   const url = "https://7f9a-38-147-83-19.ngrok-free.app/predict";
//   const payload = {
//     inputs: `<human> ${inputValue} <assistant>:`
//   };
  
//   const headers = {
//     "Content-Type": "application/json"
//   };
  
//   fetch(url, {
//     method: "POST",
//     headers: headers,
//     body: JSON.stringify(payload)
//   })
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error("Error:", error));
  
// }

  

  const handleHashCopy = (transactionHash) => {
    navigator.clipboard.writeText(transactionHash).then(
      () => {
        setCopy(true);
        setTimeout(() => {
          setCopy(false);
        }, 3000);
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };
  const TokenImage = {
    cosmoshub: atomSuccessImage,
    solana: "https://cryptologos.cc/logos/solana-sol-logo.png",
    ethereum:
      "https://cdn3d.iconscout.com/3d/premium/thumb/ethereum-coin-5533573-4623160.png",
  };

  const TransactionCard = ({
    blockchainImage,
    blockchainName,
    amount,
    recipient,
    transactionHash,
  }) => (
    <div className="transaction-card">
      <img src={blockchainImage} alt={blockchainName} />
      <div className="transaction-details">
        <span>successfully sent</span>
        <h3>{amount} Atom</h3>
        <p>to {recipient ? recipient.slice(0, 16) + "..." : "Unknown"}</p>
        {/* <p>{blockchainName}</p> */}
        {/* <p><strong>Transaction Hash:</strong> {transactionHash}</p> */}
        <button onClick={() => handleHashCopy(transactionHash)}>
          {copy ? "Copied ✅" : "Copy Hash"}
        </button>
      </div>
    </div>
  );
  
  const handleSend = async () => {
    // const inputParts = inputValue.split(" ");
    const isTransaction = true;
    // const [chainName, transactionType, amount, recipient] = inputParts;
    // const params = { recipient, amount };
    const mnemonic = "sign public soldier jewel flavor bring you hand inject soft trust lens"; // Replace with actual mnemonic
  
    if (inputValue.trim()) {
      const userMessage = {
        text: inputValue,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages([...messages, userMessage]);
      setInputValue("");
  
      const loadingMessage = {
        type: "loading",
        text: "Loading...",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, loadingMessage]);
  
      setLoading(true);
  
      try {
        if (isTransaction) {
          const transactionFunction = await testing(inputValue, mnemonic, chainConfig);
          console.log(transactionFunction);
          const transactionHash = await transactionFunction
          const botReply = {
            type: "transaction",
            blockchainImage: TokenImage.cosmoshub, // Set the appropriate image path
            blockchainName: "cosmoshub",
            amount: "0.01", // Replace with the actual amount
            recipient: "recipient_address", // Replace with the actual recipient
            transactionHash: transactionHash,
          };
          setMessages((prevMessages) => [
            ...prevMessages.slice(0, -1),
            botReply,
          ]);
        } else {
          const botReply = {
            text: `Echo: ${inputValue}`,
            sender: "bot",
            timestamp: new Date(),
          };
          setMessages((prevMessages) => [
            ...prevMessages.slice(0, -1),
            botReply,
          ]);
        }
      } catch (error) {
        console.error("Error:", error);
        const botReply = {
          text: "Error occurred during transaction.",
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages.slice(0, -1), botReply]);
      }
  
      setLoading(false);
    }
  };
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="chat-container">
    <div className="overlay"></div>
    <i className="bx bx-dots-horizontal-rounded chat-container-menu"></i>
    <div className="chat-messages">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`chat-message ${
            message.sender === "user" ? "user-message" : "bot-message"
          }`}
        >
          {message.type === "transaction" ? (
            <TransactionCard
              blockchainImage={message.blockchainImage}
              blockchainName={message.blockchainName}
              amount={message.amount}
              recipient={message.recipient}
              transactionHash={message.transactionHash}
            />
          ) : message.type === "loading" ? (
            <div className="loading-message">
              <div className="loading-circle"></div>
              <div className="loading-text">{loadingText}</div>
            </div>
          ) :(
            <>
              <div className="message-text">{message.text}</div>
              <div className="message-time">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
    <div className="chat-input-container">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your message or transaction (chainName transactionType amount recipient)"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
      />
      <i onClick={handleSend}>
        <BiSend fontSize="20px" />
      </i>
    </div>
    {/* {loading && (
        <div className="loading-overlay">
          <div className="loading-circle"></div>
          <div className="loading-text">{loadingText}</div>
        </div>
      )} */}
  </div>
  );
};

// const NewChatForm = ({ onAddChat }) => {
//   const [chatTitle, setChatTitle] = useState("");

//   const handleAddChat = () => {
//     if (chatTitle) {
//       onAddChat({ title: chatTitle, date: "Today" });
//       setChatTitle("");
//     }
//   };

//   return (
//     <div className="chat-window">
//       <h2>Start a New Chat</h2>
//       <input
//         type="text"
//         value={chatTitle}
//         onChange={(e) => setChatTitle(e.target.value)}
//         placeholder="Enter chat title"
//       />
//       <button onClick={handleAddChat}>Start Chat</button>
//     </div>
//   );
// };

const Chatapp = () => {
  const [chats, setChats] = useState([
    { title: "Visitor Requests Product Availability", date: "Today" },
    { title: "CSS Styled Dashboard", date: "Yesterday" },
    { title: "Convert to JSX & CSS", date: "Yesterday" },
    { title: "Dashboard Components Overview", date: "Yesterday" },
    { title: "Understand Velodrome Contracts", date: "Previous 7 Days" },
    { title: "SCSS Specificity Rules Guide", date: "Previous 7 Days" },
    { title: "React Horizontal Scroll Component", date: "Previous 7 Days" },
    { title: "React Inline Style Conversion", date: "Previous 7 Days" },
    { title: "React Hover Effect", date: "Previous 7 Days" },
  ]);
  const [currentChat, setCurrentChat] = useState(null);
  const [isNewChat, setIsNewChat] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState([
    "Today",
    "Yesterday",
    "Previous 7 Days",
  ]);

  const addChat = (newChat) => {
    setChats([newChat, ...chats]);
    setCurrentChat(newChat);
    setIsNewChat(false);
  };

  const startNewChat = () => {
    setCurrentChat(null);
    setIsNewChat(true);
  };

  const selectChat = (chat) => {
    setCurrentChat(chat);
    setIsNewChat(false);
  };

  const toggleCategory = (category) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="app">
      <Sidebar
        chats={chats}
        onSelectChat={selectChat}
        onStartNewChat={startNewChat}
        toggleCategory={toggleCategory}
        expandedCategories={expandedCategories}
      />
      {isNewChat ? (
        <ChatWindow onAddChat={addChat} />
      ) : (
        <ChatWindow chat={currentChat} />
      )}
    </div>
  );
};

export default Chatapp;


// // Generated by CodiumAI

// describe('ChatWindow', () => {

//   // User sends an empty message and nothing happens
//   it('should not add a message when an empty message is sent', () => {
//     const { getByPlaceholderText, queryByText } = render(<ChatWindow />);

//     const input = getByPlaceholderText("Type your message or transaction (chainName transactionType amount recipient)");
//     fireEvent.change(input, { target: { value: "" } });
//     fireEvent.keyPress(input, { key: "Enter", code: "Enter", charCode: 13 });

//     expect(queryByText("Echo:")).not.toBeInTheDocument();
//   });
// });
