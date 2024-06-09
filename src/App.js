import React, { useState, useEffect } from 'react';
import './App.css';
import {BrowserRouter,Routes, Route,Navigate} from "react-router-dom"
import Navbar from './pages/navbar';
import Dashboard from './pages/Dashboard';
import Chatapp from './pages/Chatapp';
import OnboardingPage1 from './pages/OnboardingPage1';
import OnboardingPage2 from './pages/OnboardingPage2';
import OnboardingPage3 from './pages/OnboardingPage3';
import CreateWallet from './pages/CreateWallet';

// const RootApp = () => {
//   const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
//   const [onboardingStep, setOnboardingStep] = useState(1);

//   useEffect(() => {
//     const completedOnboarding = localStorage.getItem('onboardingComplete');
//     if (completedOnboarding) {
//       setIsOnboardingComplete(true);
//     }
//   }, []);

//   const completeOnboarding = () => {
//     setIsOnboardingComplete(true);
//     localStorage.setItem('onboardingComplete', 'true');
//   };

//   const handleNextStep = () => {
//     setOnboardingStep((prevStep) => {
//       if (prevStep < 3) {
//         const nextStep = prevStep + 1;
//         return nextStep;
//       } else {
//         completeOnboarding();
//         return prevStep;
//       }
//     });
//   };

//   return (
    
//       <Routes>
//         {!isOnboardingComplete && (
//           <>
//             <Route path="/" element={<Navigate to={`/onboarding${onboardingStep}`} />} />
//             <Route path="/onboarding1" element={<OnboardingPage1 onNext={handleNextStep} />} />
//             <Route path="/onboarding2" element={<OnboardingPage2 onNext={handleNextStep} />} />
//             <Route path="/onboarding3" element={<CreateWallet onNext={completeOnboarding} />} />
//             <Route path="*" element={<Navigate to={`/onboarding${onboardingStep}`} />} />
//           </>
//         )}
//         {isOnboardingComplete && (
//           <>
//             <Route path="/pin" element={<CreateWallet onNext={completeOnboarding} />} />
//             <Route path="*" element={<MainApp />} />
//           </>
//         )}
//       </Routes>
    
//   );
// };

// const MainApp = () => {
  

  

//   return (
//     <div className="app-container">
//       {/* <Sidebar isOpen={isSidebarOpen} onToggleSidebar={onToggleSidebar} /> */}
//       <div className="main-content">
//         {/* <TopNavbar toggleDarkMode={toggleDarkMode} /> */}
//         <div className="content">
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/Chatapp" element={<Chatapp />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// };

// function App  ()  {
//   return(
//     <BrowserRouter>
//       <RootApp />
//     </BrowserRouter>
//   )
  
// };

// export default App;


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/Chatapp" element={<Chatapp/>} />
          <Route path="/Onboarding1" element={<OnboardingPage1/>} />
          <Route path="/Onboarding2" element={<OnboardingPage2/>} />
          <Route path="/Onboarding3" element={<OnboardingPage3/>} />
          <Route path="/CreateWallet" element={<CreateWallet/>} />
          {/* <Route path="*" element={<NotFound />} /> */}

          {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
