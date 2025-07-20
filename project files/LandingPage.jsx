import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';
import heroImg from '../assets/flight-bg.jpg';   // use any local hero image

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      {/* ----- Hero Section ----- */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="hero-overlay">
          <h1 className="hero-title">Fly Smarter, Fly Cheaper ✈️</h1>
          <p className="hero-sub">Search • Compare • Book in seconds.</p>
          <button onClick={() => navigate('/login')} className="cta-btn">
             Login
          </button>

        </div>
      </section>

      {/* ----- Feature Row ----- */}
      <section className="features">
        <div className="feature">
          <i className="fas fa-plane-departure"></i>
          <h3>200+ Airlines</h3>
          <p>Find deals from every major carrier worldwide.</p>
        </div>
        <div className="feature">
          <i className="fas fa-wallet"></i>
          <h3>Best Price</h3>
          <p>Real‑time fares and zero hidden fees.</p>
        </div>
        <div className="feature">
          <i className="fas fa-headset"></i>
          <h3>24/7 Support</h3>
          <p>We’re here whenever you need us.</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
