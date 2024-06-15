import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import 'chart.js/auto';
import { MdEventNote } from "react-icons/md";
import { IoMicOutline } from "react-icons/io5";
import { FiEdit3 } from "react-icons/fi";
import { FaArrowTrendDown } from "react-icons/fa6";
import { IoMdTrendingUp } from "react-icons/io";
import { IoLockClosed } from "react-icons/io5";
import { LuClock3 } from "react-icons/lu";
import { VscGraph } from "react-icons/vsc";
import { PiCornersIn } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";
import { BiFilterAlt } from "react-icons/bi";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { Line } from 'react-chartjs-2'
import { RiStockLine } from "react-icons/ri";
const Dashboard = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July',"Aug","Sept","Oct","Nov",],
    datasets: [
      {
        label: 'Stock Price',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: '#29302c',
        data: [65, 59, 80, 30, 56, 90, 50,90,40,70,80],
        fill: false,
      tension: 0.4,
      },
    ],
  };
  const [chartData, setChartData] = useState({});
  const [price, setPrice] = useState(16073.49);
  const [percentageChange, setPercentageChange] = useState(9.3);

  useEffect(() => {
    const fetchStockData = () => {
      // Fetch the data from an API (dummy data used here)
      const newData = Array.from({ length: 10 }, () => Math.floor(Math.random() * 1) + 150);
      const newPrice = newData[newData.length - 1];
      const newPercentageChange = ((newPrice - price) / price) * 100;

      setChartData({
        labels: Array.from({ length: newData.length }, (_, i) => i + 1),
        datasets: [
          {
            label: 'Stock Price',
            data: newData,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: false,
            tension: 0.4,
          },
        ],
      });

      setPrice(newPrice.toFixed(2));
      setPercentageChange(newPercentageChange.toFixed(2));
    };

    fetchStockData();
    const interval = setInterval(fetchStockData, 5000);

    return () => clearInterval(interval);
  }, [price]);

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

  const [year, setYear] = useState(2023);
  const profitData = {
    2023: [
      { amount: '$4K', size: 'smallest' },
      { amount: '$6.8K', size: 'smaller' },
      { amount: '$9.3K', size: 'small' },
      { amount: '$14K', size: 'large' }
    ],
    2022: [
      { amount: '$3K', size: 'smallest' },
      { amount: '$5.8K', size: 'smaller' },
      { amount: '$8.3K', size: 'small' },
      { amount: '$12K', size: 'large' }
    ],
    2021: [
      { amount: '$2K', size: 'smallest' },
      { amount: '$4.8K', size: 'smaller' },
      { amount: '$7.3K', size: 'small' },
      { amount: '$10K', size: 'large' }
    ]
  };
  const profits = profitData[year];

  
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
            <input type="text" className="help-text-bottom" placeholder="|Just ask me anything!"/>
            {/* <span className="help-text-bottom"> |Just ask me anything!</span> */}
          </div>
          <div className="microphone-icon">
            <IoMicOutline fontSize="20px" />
          </div>
        </div>
      </div>
      <div className="grid">
        {/* Visa card  */}
        <div className="card item1">
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
        <div className="card item2">
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
        {/* <div className="card item3">
          <div className="lock-card-container">
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
        </div> */}

        {/* day count  */}
        <div className="card item4">
          <div className="calendar-card">
            <div className="calendar-circle-icon">
              <i className="clock-icon">
                <LuClock3 fontSize="15px" />
              </i>
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

        {/* Annual graph */}
        <div className="card item5">
          <div className="graph-card box-bg-grid">
            <div className="circle-icon">
              <i className="bar-chart-icon">
                <VscGraph fontSize="15px" />
              </i>
            </div>
            <div className="grid-background-box">
              <div className="grid-background-box-items"></div>
              <div className="grid-background-box-items"></div>
              <div className="grid-background-box-items"></div>
              <div className="grid-background-box-items"></div>
              <div className="grid-background-box-items"></div>
              <div className="grid-background-box-items"></div>
              <div className="grid-background-box-items"></div>
              <div className="grid-background-box-items"></div>
              <div className="grid-background-box-items"></div>
              <div className="grid-background-box-items"></div>
              <div className="grid-background-box-items"></div>
              <div className="grid-background-box-items"></div>
              <div className="grid-background-box-items"></div>
              <div className="grid-background-box-items"></div>
              <div className="grid-background-box-items"></div>
              <div className="grid-background-box-items"></div>
              <div className="grid-background-box-items"></div>
              <div className="grid-background-box-items"></div>
              <div className="grid-background-box-items"></div>
              <div className="grid-background-box-items"></div>
              <div className="grid-background-box-items"></div>
              
            </div>
            <div className="graph-content">
              <div className="year-marker past-year">
                <span>2023</span>
                
              </div><div className="drop-line past-line"></div>
              <div className="year-marker current-year">
                <span>2024</span>
                
              </div><div className="drop-line current-line"></div>
            </div>
          </div>
        </div>
        {/* Annual profits  */}
        <div className="card item6">
        <div className="annual-card">
      <div className="annual-card-header">
        <h2>Annual profits</h2>
        <div className="year-selector">
          <select value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
        </div>
      </div>
      <div className="profit-circles">
        {profits.map((profit, index) => (
          <div key={index} className={`circle ${profit.size}`}>
            <span className="annual-profit-amount">{profit.amount}</span>
          </div>
        ))}
      </div>
    </div>
        </div>
{/* active management section  */}

        <div className="card item7">
        <div className="activity-manager">
      <div className="top-bar">
        <h2>Activity manager</h2>
        
        <div className="activity-manager-filter-icons">
          <i className="filter-icon"><PiDotsThreeVerticalBold /></i>
          <i className="filter-icon"><PiCornersIn /></i>
          
          <i className="activity-manager-topbar-text"><BiFilterAlt fontSize="15px"/><span>Filter</span></i>
        </div>
      </div>
      <div className="activity-manager-cards-middle">
      <div className="activity-manager-search-bar">
          <i className="activity-manager-search-icon"><FiSearch /></i>
          <input className="activity-manager-search-input" type="text" placeholder="Search in activities ..." />
        </div>
        <div className="filter-buttons">
          <button className="filter-button team">Team</button>
                  <button className="filter-button insights">Insights</button>
                  <button className="filter-button today">Today</button>
          
        </div>
      </div>
      <div className="activity-manager-cards">
        <div className="activity-manager-card">
          <div className="activity-manager-card-content">
           <h3> <span className="activity-manager-card-content-span"> $43.20</span> USD</h3>
            <div className="activity-manager-chart">
            <div className="activity-manager-bar "></div>
              <div className="activity-manager-bar"></div>
              <div className="activity-manager-bar"></div>
              <div className="activity-manager-bar"></div>
              <div className="activity-manager-bar"></div>
              <div className="activity-manager-bar"></div>
              <div className="activity-manager-bar"></div>
              <div className="activity-manager-bar"></div>
              <div className="activity-manager-bar"></div>
              <div className="activity-manager-bar"></div>
              <div className="activity-manager-bar"></div>
              <div className="activity-manager-bar"></div>
              <div className="activity-manager-bar"></div>
              <div className="activity-manager-bar"></div>
              <div className="activity-manager-bar"></div>
            </div>
          </div>
        </div>
        {/* manager-plans  */}
        {/* <div className="activity-manager-card">
          <div className="activity-manager-card-content">
            <h3>Business plans</h3>
            <div className="activity-manager-plans">
              <button>Bank loans</button>
              <button>Accounting</button>
              <button>HR management</button>
            </div>
          </div>
        </div> */}
        <div className="activity-manager-card">
          <div className="activity-manager-card-content wallet-card-text">
            <h3>Wallet Verification</h3>
            <p>Enable 2-step verification to secure your wallet.</p>
            <button className="wallet-card-enable-button">Enable</button>
          </div>
        </div>
      </div>
    </div>
        </div>
{/* stock  */}
        <div className="card item8">
        <div className="stock-card">
      <div className="icon">
        <i className="stock-icon"><RiStockLine fontSize="15px" /></i>
      </div>
      <div className="price">
        <span className="currency">$</span>
        <span className="amount">1500.00</span>
      </div>
      <div className="chart">
        <Line className="canvas"
          data={data} 
          options={{ 
            responsive: true, 
            maintainAspectRatio: false, 
            plugins: { 
              legend: { display: false } 
            }, 
            scales: { 
              x: { 
                display: false 
              }, 
              y: { 
                display: false 
              } 
            } 
          }} 
        />
      </div>
      <div className="stock-footer-details">
         <div className="details">
        <h3>Main Stocks</h3>
        <p>Extended & Limited</p>
       </div> 
       <div className={`percentage ${percentageChange >= 0 ? 'positive' : 'negative'}`}>
          {percentageChange >= 0 ? '+' : ''}{percentageChange}%
        </div>
      </div>
     
      
    </div>
        </div>
        
        <div className="card item9">
        <div className="review-card">
      <div className="card-header">
        <div className="dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot active"></span>
        </div>
        <button className="close-btn">&times;</button>
      </div>
      <div className="card-content">
        <h3>Review rating</h3>
        <p>How is your business management going?</p>
        {/* <div className="rating-options">
          <span className="rating">🙁</span>
          <span className="rating">😕</span>
          <span className="rating">😐</span>
          <span className="rating">🙂</span>
          <span className="rating">😀</span>
        </div> */}
      </div>
    </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
