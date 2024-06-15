import React from "react";
import "./TopNavbar.scss";
import Profile from "../../Assets/Image/profile.jpg";

const TopNavbar = ({ toggleDarkMode }) => {
  return (
    <nav className="navbar">
      <div className="logo_item">
        <i className="bx bx-menu" id="sidebarOpen"></i>
        <p>Executor AI</p>
      </div>
      <div className="navbar-right">
        <div className="navbar_content">
          <div className="profile">
            <i className="bx bx-plus"></i>
            <img src={Profile} alt="Profile" className="profile-img" />
            <span className="profile">Abhishek</span>
          </div>
        </div>
        <div className="search_bar">
          <i className="bx bx-sun" id="darkLight" onClick={toggleDarkMode}></i>
          <i className="bx bx-bell" id="bell"></i>
          {/* <i className="bx bx-search" id="search"></i>
          <input type="text" placeholder="Start searching here.." /> */}
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
