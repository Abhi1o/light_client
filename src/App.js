import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import OnboardingPage1 from './pages/OnboardingPage1/OnboardingPage1';
import OnboardingPage2 from './pages/OnboardingPage2/OnboardingPage2';
// import OnboardingPage3 from './pages/OnboardingPage3/OnboardingPage3'; // Assuming CreateWallet is the updated OnboardingPage3
import Sidebar from "./pages/Sidebar/Sidebar";
import CreateWallet from './pages/CreateWallet/CreateWallet';
import Home from "./pages/Dashboard/Dashboard";
import TopNavbar from "./pages/TopNavbar/TopNavbar";
import Chat from "./pages/ChatWindow/Chatapp";
import Api from "./pages/ChatWindow/Api";
import Settings from "./pages/Settings/Settings";

import './App.css';

const App = () => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);

  useEffect(() => {
    const completedOnboarding = localStorage.getItem('onboardingComplete');
    if (completedOnboarding) {
      setIsOnboardingComplete(true);
    }
  }, []);

  const completeOnboarding = () => {
    setIsOnboardingComplete(true);
    localStorage.setItem('onboardingComplete', 'true');
  };

  const handleNextStep = () => {
    setOnboardingStep((prevStep) => {
      if (prevStep < 3) {
        const nextStep = prevStep + 1;
        return nextStep;
      } else {
        completeOnboarding();
        return prevStep;
      }
    });
  };

  return (
    <Routes>
      {!isOnboardingComplete && (
        <>
          <Route path="/" element={<Navigate to={`/onboarding${onboardingStep}`} />} />
          <Route path="/onboarding1" element={<OnboardingPage1 onNext={handleNextStep} />} />
          <Route path="/onboarding2" element={<OnboardingPage2 onNext={handleNextStep} />} />
          {/* <Route path="/onboarding3" element={<OnboardingPage3 onNext={completeOnboarding} />} /> */}
          <Route path="/createwallet" element={<CreateWallet onNext={completeOnboarding}/>} />
          <Route path="/home" element={<Navigate to={`/onboarding${onboardingStep}`} />} />
          
        </>
      )}
      {isOnboardingComplete && (
        <>
          <Route path="/pin" element={<CreateWallet  onNext={completeOnboarding} />} />
          <Route path="*" element={<MainApp />} />
        </>
      )}
    </Routes>
  );
};

const MainApp = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const onToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark');
  };

  return (
    <div className="app-container">
      <Sidebar isOpen={isSidebarOpen} onToggleSidebar={onToggleSidebar} />
      <div className="main-content">
        <TopNavbar toggleDarkMode={toggleDarkMode} />
        <div className="content">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/api" element={<Api />} />

            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const RootApp = () => (
  <Router>
    <App />
  </Router>
);

export default RootApp;
