import React, { useState, useEffect, useRef } from "react";
import { X, Menu, ChevronRight, Pause, Play } from "lucide-react";
import "./App.css";

export default function App() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isJackpotActive, setIsJackpotActive] = useState(true);

  // Registration form state
  const [regUsername, setRegUsername] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");

  // Jackpot state
  const [jackpot, setJackpot] = useState(23596917);
  const [jackpotChange, setJackpotChange] = useState("+");
  const [isAnimating, setIsAnimating] = useState(false);
  const jackpotRef = useRef(jackpot);
  const animationTimeoutRef = useRef(null);

  // Mobile menu items
  const mobileMenuItems = ["Home", "Lottery", "Promotion"];

  // Enhanced jackpot effect with 3-second pause
  useEffect(() => {
    let mainInterval;
    let animationInterval;

    const updateJackpot = () => {
      setIsAnimating(true);

      // Clear any existing animation interval
      if (animationInterval) clearInterval(animationInterval);

      // Determine if increase (70%) or decrease (30%)
      const shouldIncrease = Math.random() < 0.7;
      const changeType = shouldIncrease ? "+" : "-";
      setJackpotChange(changeType);

      // Generate change amount
      const changeAmount = Math.floor(Math.random() * 1000) + 500;

      if (shouldIncrease) {
        // Increase animation
        let current = jackpotRef.current;
        const target = current + changeAmount;
        const steps = 30; // Number of animation steps
        const stepValue = Math.ceil(changeAmount / steps);

        let step = 0;
        animationInterval = setInterval(() => {
          if (step >= steps) {
            clearInterval(animationInterval);
            setJackpot(target);
            jackpotRef.current = target;
            setIsAnimating(false);

            // Pause for 3 seconds after animation
            animationTimeoutRef.current = setTimeout(() => {
              if (isJackpotActive) {
                updateJackpot();
              }
            }, 3000);
            return;
          }

          current += stepValue;
          if (current > target) current = target;
          setJackpot(current);
          jackpotRef.current = current;
          step++;
        }, 40); // Fast animation (25 updates per second)
      } else {
        // Decrease animation
        let current = jackpotRef.current;
        const target = Math.max(20000000, current - changeAmount); // Don't go below 2 billion
        const steps = 30;
        const stepValue = Math.ceil(changeAmount / steps);

        let step = 0;
        animationInterval = setInterval(() => {
          if (step >= steps || current <= target) {
            clearInterval(animationInterval);
            setJackpot(target);
            jackpotRef.current = target;
            setIsAnimating(false);

            // Pause for 3 seconds after animation
            animationTimeoutRef.current = setTimeout(() => {
              if (isJackpotActive) {
                updateJackpot();
              }
            }, 3000);
            return;
          }

          current -= stepValue;
          if (current < target) current = target;
          setJackpot(current);
          jackpotRef.current = current;
          step++;
        }, 40);
      }
    };

    if (isJackpotActive) {
      // Initial delay for first update
      mainInterval = setTimeout(() => {
        updateJackpot();
      }, 1000);
    }

    return () => {
      if (mainInterval) clearTimeout(mainInterval);
      if (animationInterval) clearInterval(animationInterval);
      if (animationTimeoutRef.current)
        clearTimeout(animationTimeoutRef.current);
    };
  }, [isJackpotActive]);

  // Convert number to array for the boxes 123
  const jackpotArray = jackpot.toString().padStart(8, "0").split("");

  const slides = [
    { text: "বিনামূল্যে টাকা আয় করতে চান?", subtext: "৪টি আসাধারণ সুবিধা!" },
    { text: "Win Big Today!", subtext: "Join Now for Bonuses!" },
    { text: "Premium Casino Games", subtext: "Play & Win!" },
    { text: "Live Dealer Games", subtext: "Real Experience!" },
    { text: "Daily Cashback Offers", subtext: "More Wins!" },
  ];

  const games = [
    { name: "Super Ace", tag: "Hot Games" },
    { name: "AVIATOR", tag: "Popular", rating: 4.47 },
    { name: "Golden Empire", tag: "Pazdan Gaming" },
    { name: "Bombing Win", tag: "Jili Games" },
    { name: "Elemento", tag: "Pazdan Gaming" },
    { name: "FrontierCoast", tag: "Popular Gaming Club" },
    { name: "Strongman", tag: "" },
    { name: "Sic Bo", tag: "Ultimate Sic Bo" },
    { name: "Crash Chicken", tag: "Jili" },
    { name: "Boxing King", tag: "Jili" },
    { name: "Fortune Gems", tag: "" },
    { name: "Magic Ace WIN 2 DECE", tag: "" },
    { name: "Crazy Time", tag: "" },
    { name: "Cricket", tag: "" },
    { name: "Circus Joker 4000", tag: "" },
    { name: "Funky Time", tag: "" },
    { name: "Fly X", tag: "" },
    { name: "Tournament of Arts", tag: "" },
  ];

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    alert(`Login attempted with username: ${username}`);
  };

  const handleRegister = () => {
    if (!regUsername || !regPhone || !regPassword) {
      alert("Please fill all fields");
      return;
    }
    alert(
      `Registration successful!\nUsername: ${regUsername}\nPhone: ${regPhone}`
    );
    setShowRegisterModal(false);
    setRegUsername("");
    setRegPhone("");
    setRegPassword("");
  };

  // Format jackpot number with commas
  const formatJackpot = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const toggleJackpot = () => {
    setIsJackpotActive(!isJackpotActive);
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
  };

  return (
    <div className="casino-container">
      {/* Header */}
      <header className="casino-header">
        <div className="header-content">
          <div className="header-left">
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={24} />
            </button>
            <div className="logo">
              <span className="logo-jili">KingJILI</span>
            </div>
            <nav className={`main-nav ${isMenuOpen ? "mobile-open" : ""}`}>
              {mobileMenuItems.map((item, index) => (
                <a key={index} href="#" className="nav-link">
                  {item}
                  <ChevronRight size={16} className="mobile-chevron" />
                </a>
              ))}
              <div className="mobile-auth">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mobile-input"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mobile-input"
                />
                <div className="mobile-buttons">
                  <button
                    onClick={handleLogin}
                    className="btn-login mobile-btn"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowRegisterModal(true)}
                    className="btn-register mobile-btn"
                  >
                    Register
                  </button>
                </div>
              </div>
            </nav>
          </div>

          <div className="header-right">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="header-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="header-input"
            />
            <button onClick={handleLogin} className="btn-login">
              Login
            </button>
            <button
              onClick={() => setShowRegisterModal(true)}
              className="btn-register"
            >
              Register
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Slideshow */}
      <div className="slideshow-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? "slide-active" : ""}`}
          >
            <div className="slide-content">
              <div className="slide-badge">বিনামূল্যে</div>
              <h1 className="slide-title">{slide.text}</h1>
              <p className="slide-subtitle">{slide.subtext}</p>
            </div>
          </div>
        ))}

        {/* Slide indicators */}
        <div className="slide-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`indicator ${
                index === currentSlide ? "indicator-active" : ""
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Lottery Section */}
        <div className="lottery-section">
          <div className="lottery-content">
            <div className="lottery-promo">
              <div className="promo-text">4TH DAY SIGN IN</div>
              <div className="promo-text">LOTTERY DRAW POOL</div>
              <div className="promo-cashback">CASHBACK</div>
            </div>
            <div className="jackpot-display">
              <div className="jackpot-header"></div>

              <div className="jackpot-formatted">${formatJackpot(jackpot)}</div>

              <div className="jackpot-numbers-container">
                <div className="jackpot-numbers">
                  {jackpotArray.map((num, i) => (
                    <div
                      key={i}
                      className={`jackpot-digit ${
                        isAnimating ? "digit-animating" : ""
                      }`}
                      data-digit={num}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Games Section */}
        <div className="games-section">
          <div className="games-tabs">
            <button className="tab-button tab-active">Hot Games</button>
            <button className="tab-button">Pazdan Gaming</button>
            <button className="tab-button">Cricket</button>
          </div>

          <div className="games-grid">
            {games.map((game, index) => (
              <div key={index} className="game-card">
                <div className="game-thumbnail">
                  {game.tag && <div className="game-tag">{game.tag}</div>}
                  {game.rating && (
                    <div className="game-rating">⭐ {game.rating}</div>
                  )}
                  <div className="game-icon">🎰</div>
                </div>
                <div className="game-info">
                  <div className="game-name">{game.name}</div>
                  <button className="play-button">Play Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegisterModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              onClick={() => setShowRegisterModal(false)}
              className="modal-close"
            >
              <X size={24} />
            </button>

            <h2 className="modal-title">Register Account</h2>

            <div className="modal-form">
              <div className="form-group">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  className="form-input"
                  placeholder="Enter username"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  className="form-input"
                  placeholder="Enter phone number"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="form-input"
                  placeholder="Enter password"
                />
              </div>

              <button onClick={handleRegister} className="btn-submit">
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
