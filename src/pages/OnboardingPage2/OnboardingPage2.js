import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Globe from '../../magicui/globe';   // Ensure the path is correct
// import '../css/OnboardingPage1.css'; 
import './OnboardingPage2.scss' // Import the CSS file
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { LuBrainCircuit } from "react-icons/lu";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { FaHandHoldingUsd } from "react-icons/fa";
// import required modules
import {
  Pagination,
  Navigation,
} from "swiper/modules";

import { Swiper, SwiperSlide } from 'swiper/react';
const OnboardingPage2 = ({ onNext }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (index) => {
    setSelectedCard(index);
  };
  const navigate = useNavigate();

  const handleContinue = () => {
    onNext();
    navigate('/onboarding3');
  };
  const cardData = [
    { label: 'Learn new skills', icon:<LuBrainCircuit />, title: 'Mastering New Skills for Personal and Professional Growth' },
    { label: 'Advance my career', icon: <BsFillBriefcaseFill />, title: 'Taking Strategic Steps to Elevate Your Career' },
    { label: 'Network with professionals', icon: <MdOutlineConnectWithoutContact /> , title: 'Building a Strong Professional Network for Success' },
    { label: 'Explore new opportunities', icon: <FaHandHoldingUsd />, title: ' Discovering and Embracing New Career Opportunities' },
  ];


  return (
    <div className="onboarding2-container">
      <div className="onboarding-left left-section">
      <div className="onboarding-left-top">
        <div className="progress-bar">
          <div className="step completed1"></div>
          <div className="step completed2"></div>
          <div className="step completed3"></div>
          <div className="step"></div>
          <div className="step"></div>
          <div className="step"></div>
        </div>
        <h1>What are your primary  <br/>  goal?</h1>

        </div>

      
        <div className="card-container2">
          <Swiper
          slidesPerView="auto"
           spaceBetween={1}
           pagination={{ clickable: true }}
          //  navigation
           modules={[Pagination, Navigation]}
           breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 110,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            // when window width is >= 1024px
            
          }}
           className="swiper-container"
          >
           {cardData.map((item, index) => (
              <SwiperSlide key={index} className="swiper-slide">
                <div
                  className={`onboarding2-card ${selectedCard === index ? 'selected' : ''}`}
                  onClick={() => handleCardClick(index)}
                >
                  <div className="onboarding2-card-tick">{selectedCard === index && '✔'}</div>
                  <div className="onboarding2-card-content">
                    <div className="onboarding2-card-icon">
                  <i className={`onboarding2-icon-${item.icon}`} >{item.icon}</i> 
                  </div>
                  <h4>{item.label}</h4>
                  <p>{item.title}</p>
                  </div>
                  
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* <div className="navigation-dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div> */}
        <div className="navigation-buttons">
          <button className="back-button">Back</button>
          <button className="continue-button" onClick={handleContinue}>Continue</button>
        </div>
        {/* <h2>What are your primary goals?</h2>
        <div className="options">
          <div className="option">Learn new skills</div>
          <div className="option selected">Advance my career</div>
          <div className="option">Network with professionals</div>
          <div className="option">Explore new opportunities</div>
        </div>
        <div className="onboarding-navigation">
          <button className="onboarding-button" onClick={() => navigate(-1)}>Back</button>
          <button className="onboarding-button" onClick={handleContinue}>Continue</button>
        </div> */}
      </div>
      <div className="onboarding-right right-section">
        <Globe />
      </div>
    </div>
  );
};

export default OnboardingPage2;
