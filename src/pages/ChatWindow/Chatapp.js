import React, { useState } from "react";
import "./Chatapp.css";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BiSend } from "react-icons/bi";

const Sidebar = ({
  chats,
  onSelectChat,
  onStartNewChat,
  toggleCategory,
  expandedCategories,
}) => {
  return (
    <div className="sidebar">
      <h2>Chats</h2>
      <button className="new-chat-button" onClick={onStartNewChat}>
        New Chat
      </button>
      {["Today", "Yesterday", "Previous 7 Days"].map((dateCategory) => (
        <div key={dateCategory} className="chat-tile">
          <h6
            className="date-category"
            onClick={() => toggleCategory(dateCategory)}
          >
            <i className="arrow-icon">
              <MdKeyboardArrowDown />
              <MdOutlineKeyboardArrowRight />
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

//   const ChatWindow = () => {
//     return (
//       <div className="chat-window">
//         <h2>{chat ? chat.title : 'Select a Chat'}</h2>
//         {chat ? (
//           <p>Chat content for "{chat.title}" goes here...</p>
//         ) : (
//           <p>Please select a chat to view its content.</p>
//         )}
//       </div>
//     );
//   };
const ChatWindow = ({ chat }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      const userMessage = {
        text: inputValue,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages([...messages, userMessage]);
      setInputValue("");

      // apply bot settings
      setTimeout(() => {
        const botReply = {
          text: "This is a bot reply to: " + inputValue,
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, botReply]);
      }, 1000);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}>
            <div className="message-text">{message.text}</div>
            <div className="message-time">{message.timestamp.toLocaleTimeString()}</div>
          </div>
        ))}
      </div>
      <div className="chat-input-container">
      <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your response here and hit enter to send"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
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

const NewChatForm = ({ onAddChat }) => {
  const [chatTitle, setChatTitle] = useState("");

  const handleAddChat = () => {
    if (chatTitle) {
      onAddChat({ title: chatTitle, date: "Today" });
      setChatTitle("");
    }
  };

  return (
    <div className="chat-window">
      <h2>Start a New Chat</h2>
      <input
        type="text"
        value={chatTitle}
        onChange={(e) => setChatTitle(e.target.value)}
        placeholder="Enter chat title"
      />
      <button onClick={handleAddChat}>Start Chat</button>
    </div>
  );
};

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
        <NewChatForm onAddChat={addChat} />
      ) : (
        <ChatWindow chat={currentChat} />
      )}
    </div>
  );
};

export default Chatapp;
