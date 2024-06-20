import React, { useState, useEffect, useRef } from "react";
import "./Chatapp.scss";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BiSend } from "react-icons/bi";
import simplefubbg from "../../Assets/Image/simple-chat-bg.jpg";
import axios from "axios";
import atomSuccessImage from "../../Assets/Image/AtomSuccess1.jpg";
const { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");
const {
  assertIsBroadcastTxSuccess,
  SigningStargateClient,
} = require("@cosmjs/stargate");
const {
  Connection,
  Keypair,
  Transaction,
  LAMPORTS_PER_SOL,
  SystemProgram,
  sendAndConfirmTransaction,
} = require("@solana/web3.js");
const { ethers } = require("ethers");
const bip39 = require("bip39");

// // Configuration for different blockchains
// const chainConfigs = {
//   cosmoshub: {
//       rpcEndpoint: 'https://cosmos-rpc.quickapi.com:443',
//       denom: 'uatom',
//       prefix: 'cosmos',
//   },
//   osmosis: {
//       rpcEndpoint: 'https://rpc-osmosis.blockapsis.com',
//       denom: 'uosmo',
//       prefix: 'osmo',
//   },
//   akash: {
//       rpcEndpoint: 'https://rpc.akash.forbole.com',
//       denom: 'uakt',
//       prefix: 'akash',
//   },
//   solana: {
//       rpcEndpoint: 'https://api.mainnet-beta.solana.com',
//       denom: 'sol',
//   },
//   ethereum: {
//       rpcEndpoint: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
//   },
// };

// // Derive Solana Keypair from mnemonic
// function getSolanaKeypairFromMnemonic(mnemonic) {
//   const seed = bip39.mnemonicToSeedSync(mnemonic).slice(0, 32);
//   return Keypair.fromSeed(seed);
// }

// // Derive Ethereum Wallet from mnemonic
// function getEthereumWalletFromMnemonic(mnemonic) {
//   return ethers.Wallet.fromMnemonic(mnemonic);
// }

// // Execute transaction on the specified blockchain
// async function executeTransaction(chainName, transactionType, mnemonic, params) {
//   if (chainName === 'solana') {
//       return executeSolanaTransaction(transactionType, mnemonic, params);
//   } else if (chainName === 'ethereum') {
//       return executeEthereumTransaction(transactionType, mnemonic, params);
//   } else {
//       return executeCosmosTransaction(chainName, transactionType, mnemonic, params);
//   }
// }

// // Execute Cosmos transaction
// async function executeCosmosTransaction(chainName, transactionType, mnemonic, params) {
//   const chainConfig = chainConfigs[chainName];

//   if (!chainConfig) {
//       throw new Error(`Unsupported chain: ${chainName}`);
//   }
//   console.log("before", chainConfig.prefix);
//   const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: chainConfig.prefix });
//   console.log("after", wallet);
//   console.log("after1")
//   const [firstAccount] = await wallet.getAccounts();
//   console.log("after2")
//   const client = await SigningStargateClient.connectWithSigner(chainConfig.rpcEndpoint, wallet);
//   console.log("after3")
//   const fee = {
//       amount: [{ denom: chainConfig.denom, amount: '5000' }],
//       gas: '200000',
//   };

//   let result;

//   switch (transactionType) {
//       case 'send':
//         console.log("before")
//           const sendAmount = { denom: chainConfig.denom, amount: params.amount };
//           result = await client.sendTokens(firstAccount.address, params.validatorAddress, [sendAmount], fee, 'Sending tokens');
//           console.log("after")
//           break;
//       case 'ibcTransfer':
//           const transferAmount = { denom: chainConfig.denom, amount: params.amount };
//           const channel = { sourcePort: 'transfer', sourceChannel: 'channel-0' };
//           const timeoutHeight = { revisionNumber: 1, revisionHeight: 12345678 };
//           result = await client.sendIbcTokens(firstAccount.address, params.validatorAddress, transferAmount, channel, timeoutHeight, fee, 'IBC transfer');
//           break;
//       case 'delegate':
//           const delegateAmount = { denom: chainConfig.denom, amount: params.amount };
//           result = await client.delegateTokens(firstAccount.address, params.validatorAddress, delegateAmount, fee, 'Delegating tokens');
//           break;
//       case 'undelegate':
//           const undelegateAmount = { denom: chainConfig.denom, amount: params.amount };
//           result = await client.undelegateTokens(firstAccount.address, params.validatorAddress, undelegateAmount, fee, 'Undelegating tokens');
//           break;
//       case 'redelegate':
//           const redelegateAmount = { denom: chainConfig.denom, amount: params.amount };
//           result = await client.redelegateTokens(firstAccount.address, params.srcValidatorAddress, params.dstValidatorAddress, redelegateAmount, fee, 'Redelegating tokens');
//           break;
//       case 'submitProposal':
//           const proposalMsg = {
//               typeUrl: '/cosmos.gov.v1beta1.MsgSubmitProposal',
//               value: {
//                   content: {
//                       typeUrl: '/cosmos.gov.v1beta1.TextProposal',
//                       value: { title: params.title, description: params.description },
//                   },
//                   initialDeposit: [{ denom: chainConfig.denom, amount: params.deposit }],
//                   proposer: firstAccount.address,
//               },
//           };
//           result = await client.signAndBroadcast(firstAccount.address, [proposalMsg], fee, 'Submitting proposal');
//           break;
//       case 'vote':
//           const voteMsg = {
//               typeUrl: '/cosmos.gov.v1beta1.MsgVote',
//               value: { proposalId: params.proposalId, voter: firstAccount.address, option: params.option },
//           };
//           result = await client.signAndBroadcast(firstAccount.address, [voteMsg], fee, 'Voting on proposal');
//           break;
//       default:
//           throw new Error('Unsupported transaction type');
//   }

//   assertIsBroadcastTxSuccess(result);
//   console.log('Transaction successful with hash:', result.transactionHash);
// }

// // Execute Solana transaction
// async function executeSolanaTransaction(transactionType, mnemonic, params) {
//   const connection = new Connection(chainConfigs.solana.rpcEndpoint, 'confirmed');
//   const keypair = getSolanaKeypairFromMnemonic(mnemonic);

//   let transaction = new Transaction();
//   let result;

//   switch (transactionType) {
//       case 'send':
//           const sendAmount = parseInt(params.amount, 10) * LAMPORTS_PER_SOL;
//           transaction.add(SystemProgram.transfer({
//               fromPubkey: keypair.publicKey,
//               toPubkey: params.validatorAddress,
//               lamports: sendAmount,
//           }));
//           break;
//       default:
//           throw new Error('Unsupported transaction type');
//   }

//   result = await sendAndConfirmTransaction(connection, transaction, [keypair]);
//   console.log('Transaction successful with hash:', result);
// }

// // Execute Ethereum transaction
// async function executeEthereumTransaction(transactionType, mnemonic, params) {
//   const provider = new ethers.providers.JsonRpcProvider(chainConfigs.ethereum.rpcEndpoint);
//   const wallet = getEthereumWalletFromMnemonic(mnemonic).connect(provider);

//   let result;

//   switch (transactionType) {
//       case 'send':
//           const sendAmount = ethers.utils.parseEther(params.amount);
//           const tx = {
//               to: params.validatorAddress,
//               value: sendAmount,
//               gasLimit: 21000,
//               gasPrice: await provider.getGasPrice(),
//           };
//           result = await wallet.sendTransaction(tx);
//           break;
//       default:
//           throw new Error('Unsupported transaction type');
//   }

//   console.log('Transaction successful with hash:', result.hash);
// }

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

//

const testing = async (chainName, transactionType, mnemonic, params) => {
  try {
    const response = await axios.post("http://localhost:5000/api/data", {
      chainName,
      transactionType,
      mnemonic,
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error executing transaction:", error);
    throw error;
  }
};

const ChatWindow = ({ chat }) => {
  const [copy, setCopy] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  // const messagesEndRef = useRef(null);
  const handleHashCopy = (transactionHash) => {
    navigator.clipboard.writeText(transactionHash).then(
      () => {
        setCopy(true);
        setTimeout(() => {
          setCopy(false);
        }, 2000);
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
    validatorAddress,
    transactionHash,
  }) => (
    <div className="transaction-card">
      <img src={blockchainImage} alt={blockchainName} />
      <div className="transaction-details">
        <span>successfully send</span>
        <h3> {amount} Atom </h3>
        <p> to {validatorAddress.slice(0, 16) + "..."}</p>
        {/* <p> {blockchainName}</p> */}

        {/* <p><strong>Transaction Hash:</strong> {transactionHash}</p> */}
        <button onClick={() => handleHashCopy(transactionHash)}>
          {copy ? "Copied ✅" : "Copy Hash"}
        </button>
      </div>
    </div>
  );
  const handleSend = async () => {
    const inputParts = inputValue.split(" ");
    const isTransaction = inputParts.length === 4;
    const [chainName, transactionType, amount, validatorAddress] = inputParts;
    const params = { validatorAddress, amount };
    const mnemonic = ""; // Replace with actual mnemonic

    if (inputValue.trim()) {
      const userMessage = {
        text: inputValue,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages([...messages, userMessage]);
      setInputValue("");

      const loadingMessage = {
        text: "Loading...",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, loadingMessage]);

      setLoading(true);

      try {
        if (isTransaction) {
          const transactionHash = await testing(
            chainName,
            transactionType,
            mnemonic,
            params
          );
          const botReply = {
            type: "transaction",
            blockchainImage: TokenImage[chainName], // Set the appropriate image path
            blockchainName: chainName,
            amount,
            validatorAddress: params.validatorAddress,
            transactionHash: transactionHash.hash,
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
  // useEffect(() => {
  //   if (messagesEndRef.current) {
  //     messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [messages]);

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
                validatorAddress={message.validatorAddress}
                transactionHash={message.transactionHash}
              />
            ) : (
              <>
                <div className="message-text">{message.text}</div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </>
            )}
          </div>
        ))}
        {/* <div ref={messagesEndRef} /> */}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message or transaction (chainName transactionType amount validatorAddress)"
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

//     const input = getByPlaceholderText("Type your message or transaction (chainName transactionType amount validatorAddress)");
//     fireEvent.change(input, { target: { value: "" } });
//     fireEvent.keyPress(input, { key: "Enter", code: "Enter", charCode: 13 });

//     expect(queryByText("Echo:")).not.toBeInTheDocument();
//   });
// });
