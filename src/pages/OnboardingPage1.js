import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Globe from '../magicui/globe';  // Ensure the path is correct
import '../css/OnboardingPage1.css';  // Import the CSS file
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { TbTie } from "react-icons/tb";
import { VscDebugConsole } from "react-icons/vsc";
import { FaShoppingCart } from "react-icons/fa";
import { MdDesignServices } from "react-icons/md";
// import required modules
import {
  Pagination,
  Navigation,
} from "swiper/modules";

import { Swiper, SwiperSlide } from 'swiper/react';

const OnboardingPage1 = ({ onNext }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (index) => {
    setSelectedCard(index);
  };
  const navigate = useNavigate();

  const handleContinue = () => {
    onNext();
    navigate('/onboarding2');
  };

  const cardData = [
    { label: 'Business management', icon: <TbTie /> },
    { label: 'Design', icon: <MdDesignServices /> },
    { label: 'Development', icon: <VscDebugConsole /> },
    { label: 'Marketing', icon: <FaShoppingCart />},
  ];

  return (
    <div className="onboarding-container">
      <div className="onboarding-left left-section">
        <div className="onboarding-left-top">
        <div className="progress-bar">
          <div className="step completed"></div>
          <div className="step completed"></div>
          <div className="step"></div>
          <div className="step"></div>
          <div className="step"></div>
          <div className="step"></div>
        </div>
        <h1>What kind of work <br/> do you do?</h1>

        </div>

      
        <div className="card-container">
          <Swiper
          slidesPerView="auto"
           spaceBetween={1}
           pagination={{ clickable: true }}
          //  navigation
           modules={[Pagination, Navigation]}
           breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 6,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
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
                  className={`card ${selectedCard === index ? 'selected' : ''}`}
                  onClick={() => handleCardClick(index)}
                >
                  <div className="tick">{selectedCard === index && '✔'}</div>
                  <div className="card-content">
                    <div className="card-icon">
                  <i className={`icon-${item.icon}`} >{item.icon}</i> 
                  </div>
                  <span>{item.label}</span>
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
          <button className="continue-button">Continue</button>
        </div>
        {/* <h2>What kind of work do you do?</h2>
        <div className="options">
          <div className="option">Business Management</div>
          <div className="option selected">Design</div>
          <div className="option">Development</div>
          <div className="option">Marketing</div>
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

export default OnboardingPage1;