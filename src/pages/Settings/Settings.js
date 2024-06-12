// src/components/Settings.js
import React from 'react';
import './Settings.css';

const Settings = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Today's Money</h3>
          <p>$53,000</p>
          <span>+55%</span>
        </div>
        <div className="dashboard-card">
          <h3>Today's Users</h3>
          <p>2,300</p>
          <span>+3%</span>
        </div>
        <div className="dashboard-card">
          <h3>New Clients</h3>
          <p>3,462</p>
          <span>-2%</span>
        </div>
        <div className="dashboard-card">
          <h3>Sales</h3>
          <p>$103,430</p>
          <span>+5%</span>
        </div>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-widget">
          <h2>Soft UI Dashboard</h2>
          <p>From colors, cards, typography to complex elements, you will find the full documentation.</p>
          <a href="#">Read More</a>
        </div>
        <div className="dashboard-widget">
          <h2>Work with the rockets</h2>
          <p>Wealth creation is an evolutionarily recent positive-sum game. It is all about who takes the opportunity first.</p>
          <a href="#">Read More</a>
        </div>
      </div>
      <div className="dashboard-charts">
        <div className="dashboard-chart">
          <h2>Active Users</h2>
          <p>(+23%) than last week</p>
        </div>
        <div className="dashboard-chart">
          <h2>Sales Overview</h2>
          <p>4% more in 2021</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;

