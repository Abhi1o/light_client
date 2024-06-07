import React, { useEffect, useState } from "react";
import "../css/dashboard.css";
import { MdEventNote } from "react-icons/md";
import { IoMicOutline } from "react-icons/io5";
import { FiEdit3 } from "react-icons/fi";
import { FaArrowTrendDown } from "react-icons/fa6";
import { IoMdTrendingUp } from "react-icons/io";
import { IoLockClosed } from "react-icons/io5";
const Dashboard = () => {
    const totalIncome = 23194.8;
  const totalPaid = 8145.2;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const getCurrentDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const dayName = date.toLocaleString("default", { weekday: "long" });

    return { day, month, dayName };
  };

  const { day, month, dayName } = getCurrentDate();

  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    const totalDays = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    setDaysInMonth(Array.from({ length: totalDays }, (_, i) => i + 1));

    return () => clearInterval(interval);
  }, [currentDate]);

  const completedDays = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  return (
    <div className="container">
      {/* hero section  */}
      <div className="hero-section">
        <div className="hero-sectionleft">
          <div className="date-container">
            <div className="date-circle">{day}</div>
            <div className="date-text">
              <div className="day-name">{dayName},</div>
              <div className="month-name">{month}</div>
            </div>
          </div>
          <hr />
          <div className="tasks-container">
            <button className="tasks-button">Show my Tasks</button>
            <div className="calendar-icon">
              <MdEventNote fontSize="20px" />
              <span className="notification-dot"></span>
            </div>
          </div>
        </div>
        <div className="hero-sectionright">
          <div className="help-text">
            <span className="help-text-top">
              Hey, Need help?{" "}
              <span role="img" aria-label="wave">
                👋
              </span>{" "}
            </span>
            <span className="help-text-bottom"> |Just ask me anything!</span>
          </div>
          <div className="microphone-icon">
            <IoMicOutline fontSize="20px" />
          </div>
        </div>
      </div>
      <div className="grid">
        {/* Visa card  */}
        <div className="card">
          <div className="card-buttom-body">
            <div className="card-top-body">
              <div className="card-header">
                <div className="card-logo">VISA</div>
                <button className="direct-debits-button">Direct Debits</button>
              </div>
              <div className="visa-card-body">
                <div className="linked-account">Linked to main account</div>
                <div className="account-number">**** 2719</div>
                <div className="action-buttons">
                  <button className="visa-receive-button">Receive</button>
                  <button className="visa-send-button">Send</button>
                </div>
              </div>
            </div>

            <div className="card-footer">
              <div className="visa-card-footer-left">
                <div className="monthly-fee">Monthly regular fee</div>
                <div className="fee-amount">$ 25.00</div>
              </div>

              <button className="edit-limitation-button">
                <FiEdit3
                  color="white"
                  className="edit-limitation-button-icon"
                />
                <div className="edit-limitation-button-text">
                  <span>Edit</span>
                  <span>cards limitation</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        {/* income card  */}
        <div className="card">
          <div className="card-buttom-body">
            <div className="card-top-body">
              <div className="card-header">
                <div className="income-card-icon">
                  <IoMdTrendingUp />
                </div>
                <select className="income-card-select">
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Yearly</option>
                </select>
              </div>
              <div className="income-card-body">
                <div className="income-card-title">Total income</div>
                <div className="income-card-amount ">
                  <span className="income">$ </span>
                  {totalIncome.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="paid-card-footer">
              <div className="card-header">
                <div className="paid-card-icon">
                  <FaArrowTrendDown />
                </div>
                <select className="paid-card-select">
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Yearly</option>
                </select>
              </div>
              <div className="paid-card-footer-body">
                <div className="paid-card-body">
                  <div className="paid-card-title">Total paid</div>
                  <div className="paid-card-amount ">
                    <span className="paid">$ </span>
                    {totalPaid.toLocaleString()}
                  </div>
                </div>

                <button className="paid-chart-mode-button">
                  {" "}
                  <IoMdTrendingUp
                    className="paid-chart-mode-button-icon"
                    color="white"
                  />
                  <div className="paid-chart-mode-button-text">
                    View <br />
                    on chart mode
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* system lock  */}
        <div className="card" style={{ width: "120px" }}>
          <div className="card-container">
            <div className="lock-circle-icon">
              <i className="lock-icon">
                <IoLockClosed fontSize="19px" />
              </i>
              <span className="circle-label">System Lock</span>
            </div>
            <div className="progress-circle">
              <div className="progress" style={{ "--progress": "36%" }}>
                <div className="progress-detail-center">
                  <span className="progress-text">36%</span>
                  <span className="progress-label">Growth rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* day count  */}
        <div className="card" style={{ width: "150px" }}>
          <div className="calendar-card">
            <div className="circle-icon">
              <i className="clock-icon">&#x1F550;</i>
            </div>
            <div className="date-info">
              <h2>{completedDays} Days</h2>
              <p>
                {hours} hours, {minutes} minutes
              </p>
            </div>
            <div className="days-grid">
              {daysInMonth.map((day) => (
                <div
                  key={day}
                  className={`day-dot ${
                    day <= completedDays ? "completed" : ""
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Annual profits  */}
        <div className="card">
          <h6>Annual profits</h6>
          <p>$14K</p>
          <p>$9.3K</p>
          <p>$6.8K</p>
          <p>$4K</p>
        </div>
        <div className="card">
          <h6>Activity manager</h6>
          <h6>$43.20 USD</h6>
          <div className="button-group">
            <button className="team-button">Team</button>
            <button className="insights-button">Insights</button>
          </div>
          <input
            type="text"
            className="activity-search-input"
            placeholder="Search in activities..."
          />
        </div>
        <div className="card">
          <h6>Main Stocks</h6>
          <h6>$16,073.49</h6>
          <p>+9.3%</p>
        </div>
        <div className="card center-card">
          <h6>Wallet Verification</h6>
          <button className="enable-button">Enable</button>
        </div>
        <div className="card center-card">
          <h6>How is your business management going?</h6>
          <div className="emoji-buttons">
            <button>😃</button>
            <button>😊</button>
            <button>😐</button>
            <button>☹️</button>
            <button>😠</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
