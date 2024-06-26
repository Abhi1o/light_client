import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Globe from '../../magicui/globe';  // Ensure the path is correct
import './OnboardingPage3.scss';  // Import the CSS file
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { TbTie } from "react-icons/tb";
import { VscDebugConsole } from "react-icons/vsc";
import { FaShoppingCart } from "react-icons/fa";
import { MdDesignServices } from "react-icons/md";
// import rightcarcoot from "../../Assets/Image/2150248728.jpg"
import workcartoon from "../../Assets/Image/workcartoon.webp";
import chatbot from "../../Assets/Image/chatbot.jpg";
// import required modules
import {
  Pagination,
  Navigation,
} from "swiper/modules";

import { Swiper, SwiperSlide } from 'swiper/react';

const OnboardingPage3 = ({ onNext }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (index) => {
    setSelectedCard(index);
  };
  const navigate = useNavigate();

  const handleContinue = () => {
    onNext();
    navigate('/onboarding4');
  };

  const cardData = [
    { label: 'Business management', icon: <TbTie /> },
    { label: 'Design', icon: <MdDesignServices /> },
    { label: 'Development', icon: <VscDebugConsole /> },
    { label: 'Marketing', icon: <FaShoppingCart />},
  ];

  return (
    <div className="onboarding-container1">
      <div className="onboarding-left left-section">
        <div className="onboarding1-left-top">
        <div className="progress-bar">
          <div className="step completed1"></div>
          <div className="step completed2 "onClick={handleContinue}></div>
          <div className="step completed3"></div>
          <div className="step"></div>
          <div className="step"></div>
          <div className="step"></div>
        </div>
        <h1 className='onboarding-page1-heading'>What kind of work <br/> do you do?</h1>

        </div>

      
        <div className="card-container1">
          <Swiper
          slidesPerView="auto"
           spaceBetween={1}
           pagination={{ clickable: true }}
          //  navigation
           modules={[Pagination, Navigation]}
           breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 6,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 1,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1300:{
              slidesPerView: 4,
              spaceBetween: 5,

            },
            1450:{
              slidesPerView: 4,
              spaceBetween: 10,
            }

            // when window width is >= 1024px
            
          }}
           className="swiper-container"
          >
           {cardData.map((item, index) => (
              <SwiperSlide key={index} className="swiper-slide">
                <div
                  className={`onboarding1-card ${selectedCard === index ? 'selected' : ''}`}
                  onClick={() => handleCardClick(index)}
                >
                  <div className="onboarding1-card-tick">{selectedCard === index && '✔'}</div>
                  <div className="onboarding1-card-content">
                    <div className="onboarding1-card-icon">
                  <i className={`icon-${item.icon}`} >{item.icon}</i> 
                  </div>
                  <h4 className='onboarding1-card-title'>{item.label}</h4>
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
      <div className="onboarding1-right right-section">
        {/* <Globe /> */}
        <img src={chatbot} className="onboarding1-right-cartoon" />
      </div>
    </div>
  );
};

export default OnboardingPage3;