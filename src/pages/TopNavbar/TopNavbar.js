import React from 'react';
import './TopNavbar.css';

const TopNavbar = ({ toggleDarkMode }) => {
  return (
    <nav className="navbar">
      <div className="logo_item">
        <i className="bx bx-menu" id="sidebarOpen"></i>
        Executor AI
      </div>
      <div className="search_bar">
        <input type="text" placeholder="Search" />
      </div>
      <div className="navbar_content">
        <i className="bx bx-sun" id="darkLight" onClick={toggleDarkMode}></i>
        <i className="bx bx-bell"></i>
        <img src="images/profile.jpg" alt="Profile" className="profile" />
      </div>
    </nav>
  );
};

export default TopNavbar;
