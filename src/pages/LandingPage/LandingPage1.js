import "./LandingPage1.css";
import bgnetwork from "../../Assets/Image/NewProject.png";
import drakgradient from "../../Assets/Image/rectangle-161.svg";
import button from "../../Assets/Image/button.svg";
import gdline3 from "../../Assets/Image/line3.svg";
import gdline1 from "../../Assets/Image/line-1.svg";
import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <div className="hero-section1">
      {/* <img className="background-1-icon1" alt="" src={bgnetwork} /> */}
      {/* <img className="rectangle-icon" alt="" src={drakgradient} /> */}
      <div className="overlay"/>
      <header className="frame-parent">
        <div className="crypto-hub-wrapper">
          <a className="crypto-hub1">Execulae AI</a>
        </div>
        {/* <div className="contact-details-parent">
          <div className="contact-details">
            <div className="contact-icon" />
            <a className="contact1">Create Wallet</a>
            <button className="contact1">Create Wallet</button>
            <Link to="/onboarding2"><button className="contact1" >Create Wallet</button></Link>

          </div>
          <div className="sign-wrapper">
            <a className="sign1">Log In</a>
            <Link to="/login"><button className="sign1" >Log In</button></Link>

          </div>
        </div> */}
        {/* <div className="rectangle-parent">
          
        </div> */}
      </header>
      <section className="frame-section">
        <div className="welcome-header-parent">
          <div className="welcome-header">
            <div className="update1" />
            <div className="welcome-to-cryptohub1">Execulae AI</div>
          </div>
            <h1 className="empowering-your1">Transactions with </h1>
            <h1 className="crypto-journey1">AI Assistance</h1>
          <div className="journey-description">
            <div className="discover-the-ultimate1">
              Discover the ultimate platform to stake, invest, and manage your
              cryptocurrency assets. Our user-friendly interface and advanced
              tools provide a seamless experience. Stay ahead with real-time
              data and expert insights. Maximize your rewards with secure
              staking options. Join our community of savvy investors today.
            </div>
          <div className="landingpage-bottom">
            <Link to="/onboarding2"><button className="button1">
            <div className="glow1"/>
            <div className="button-parent">
              <img className="button-icon1" alt="" src={button} />
              <div className="get-started1"> Create Wallet</div>
            </div>
          </button>
          </Link>
          <Link to="/login"><button className="sign1" >Log In</button></Link>
          </div>
          </div>
          
        </div>
      </section>
      <footer className="footer-background-parent">
        <div className="footer-background" />
        <div className="frame-group">
          <div className="vector-wrapper">
            <img
              className="line-icon"
              loading="lazy"
              alt=""
              src={gdline3}
            />
          </div>
          <img
            className="frame-child1"
            loading="lazy"
            alt=""
            src={gdline1}
          />
          <div className="line-div" />
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
