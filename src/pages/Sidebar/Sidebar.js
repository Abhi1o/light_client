import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { IoMdChatbubbles } from "react-icons/io";
import { MdOutlinePersonalVideo } from "react-icons/md";
import { IoWalletSharp } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { SiVictoriametrics } from "react-icons/si";
import { IoMdSettings } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { SiBraintree } from "react-icons/si";
import './Sidebar.css';

const Sidebar = ({ onToggleSidebar }) => {
  const [isSidebarClosed, setIsSidebarClosed] = useState(window.innerWidth < 768);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarClosed(!isSidebarClosed);
    onToggleSidebar(!isSidebarClosed);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarClosed(true);
        onToggleSidebar(true);
      } else {
        setIsSidebarClosed(false);
        onToggleSidebar(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [onToggleSidebar]);

  return (
    <nav className={`sidebar ${isSidebarClosed ? 'close' : ''}`}>
      <div className="menu_content">
        <ul className="menu_items">
          <div className="menu_title menu_dahsboard"></div>
          <li className={`item ${location.pathname === '/' ? 'active' : ''}`}>
            <Link to="/" className="nav_link">
              <span className="navlink_icon">
                <i className="bx bx-home-alt"></i>
              </span>
              <span className="navlink">Dashboard</span>
            </Link>
          </li>
          <li className={`item ${location.pathname === '/chat' ? 'active' : ''}`}>
            <Link to="/chat" className="nav_link">
              <span className="navlink_icon">
                <i className="bx bx-chat"></i>
              </span>
              <span className="navlink">New Chat</span>
            </Link>
          </li>
        </ul>
        <ul className="menu_items">
          <div className="menu_title menu_setting"></div>
          <li className={`item ${location.pathname === '/settings' ? 'active' : ''}`}>
            <Link to="/settings" className="nav_link">
              <span className="navlink_icon">
                <i ><MdOutlinePersonalVideo /></i>
              </span>
              <span className="navlink">Personalise Me</span>
            </Link>
          </li>
          {/* <li className={`item ${location.pathname === '/settings' ? 'active' : ''}`}>
            <Link to="/settings" className="nav_link">
              <span className="navlink_icon">
                <i ><IoWalletSharp /></i>
              </span>
              <span className="navlink">Wallet Management</span>
            </Link>
          </li>
          <li className={`item ${location.pathname === '/profile' ? 'active' : ''}`}>
            <Link to="/profile" className="nav_link">
              <span className="navlink_icon">
                <i ><ImProfile /></i>
              </span>
              <span className="navlink">Profile</span>
            </Link>
          </li>
          <li className={`item ${location.pathname === '/api' ? 'active' : ''}`}>
            <Link to="/api" className="nav_link">
              <span className="navlink_icon">
                <i ><SiBraintree /></i>
              </span>
              <span className="navlink">Marketplace</span>
            </Link>
          </li>
          <li className={`item ${location.pathname === '/profile' ? 'active' : ''}`}>
            <Link to="/profile" className="nav_link">
              <span className="navlink_icon">
                <i className="bx bx-user"></i>
              </span>
              <span className="navlink">Metrics for Nerds</span>
            </Link>
          </li> */}
          <li className={`item ${location.pathname === '/profile' ? 'active' : ''}`}>
            <Link to="/profile" className="nav_link">
              <span className="navlink_icon">
                <i className="bx bx-cog"></i>
              </span>
              <span className="navlink">Settings</span>
            </Link>
          </li>
        </ul>

        <div className="bottom_content">
          <div className="bottom expand_sidebar" onClick={toggleSidebar}>
            <span> Expand</span>
            <i className='bx bx-log-in'></i>
          </div>
          <div className="bottom collapse_sidebar" onClick={toggleSidebar}>
            <span> Collapse</span>
            <i className='bx bx-log-out'></i>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
