import "./LandingPage.css";
import bgnetwork from "../../Assets/Image/background-1@2x.png";
import drakgradient from "../../Assets/Image/rectangle-161.svg";
import button from "../../Assets/Image/button.svg";
import gdline3 from "../../Assets/Image/line3.svg";
import gdline1 from "../../Assets/Image/line-1.svg";
const LandingPage = () => {
  return (
    <div className="hero-section1">
      <img className="background-1-icon1" alt="" src={bgnetwork} />
      <img className="rectangle-icon" alt="" src={drakgradient} />
      <header className="frame-parent">
        <div className="crypto-hub-wrapper">
          <a className="crypto-hub1">Crypto Hub</a>
        </div>
        <div className="contact-details-parent">
          <div className="contact-details">
            <div className="contact-icon" />
            <a className="contact1">Contact</a>
          </div>
          <div className="sign-wrapper">
            <a className="sign1">Sign In</a>
          </div>
        </div>
        <div className="rectangle-parent">
          <div className="frame-child" />
          <div className="frame-item" />
          <div className="frame-inner" />
        </div>
      </header>
      <section className="frame-section">
        <div className="welcome-header-parent">
          <div className="welcome-header">
            <div className="update1" />
            <div className="welcome-to-cryptohub1">Welcome To cryptoHub</div>
          </div>
          <div className="journey-description">
            <h1 className="empowering-your1">Empowering Your</h1>
            <h1 className="crypto-journey1">Crypto Journey</h1>
            <div className="discover-the-ultimate1">
              Discover the ultimate platform to stake, invest, and manage your
              cryptocurrency assets. Our user-friendly interface and advanced
              tools provide a seamless experience. Stay ahead with real-time
              data and expert insights. Maximize your rewards with secure
              staking options. Join our community of savvy investors today.
            </div>
          </div>
          <button className="button1">
            <div className="glow1" />
            <div className="button-parent">
              <img className="button-icon1" alt="" src={button} />
              <div className="get-started1"> Get Started</div>
            </div>
          </button>
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
