import { useState } from "react";
import "./App.css";
import FutsalShowcase from "./assets/component/FutsalShowcase";
import HowToBook from "./assets/component/HowToBook";
import Features from "./assets/component/features";

const NAV_LINKS = [
  { href: "#courts", label: "Our courts" },
  { href: "#experience", label: "The experience" },
  { href: "#booking", label: "How to book" },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
      <div className="website">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          <h1>Ritik</h1>
          <span>FUTSAL CLUB</span>
        </div>

        <div className="nav-links">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <a href="#booking" className="book-btn">
            Book a court <span>↗</span>
          </a>

          <button
            type="button"
            className={`menu-toggle ${menuOpen ? "open" : ""}`}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      {menuOpen && (
        <div className="mobile-menu">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <a href="#booking" className="mobile-book-btn" onClick={closeMenu}>
            Book a court <span>↗</span>
          </a>
        </div>
      )}

     
      {/* HERO SECTION */}
      <section className="hero" id="courts">

        <div className="hero-content">

          <p className="eyebrow">
            KATHMANDU SPIRIT. FIVE-A-SIDE SOUL.
          </p>

          <h2>
            YOUR SQUAD.
            <br />
            <span>YOUR GROUND</span>
          </h2>

          <p className="description">
            Big energy. Better football. Get your team together
            <br />
            on grass turf or rubber courts, the Nepal way.
          </p>

          <div className="hero-buttons">
            <a href="#experience" className="find-btn">
              Find your court <span>↗</span>
            </a>

            <a href="#experience" className="explore-btn">
              Explore the grounds ↓
            </a>
          </div>

        </div>

        {/* HERO BOTTOM LINE */}
        <div className="section-bottom-bar hero-info">
          <span>03 / COURT SURFACES</span>
          <span>5-A-SIDE / ALL HEART</span>
        </div>

        {/* IMAGE COLLAGE */}
        <div className="hero-gallery">

          <div className="hero-image image-one">
            <img src="/bash.jpg" alt="Outdoor futsal ground" />
          </div>

          <div className="hero-image image-two">
            <img src="/beh.jpg" alt="Futsal court" />
          </div>

          <div className="hero-image image-three">
            <img src="/bleh.jpg" alt="Night futsal ground" />
          </div>

          <p className="gallery-caption">
            BUILT FOR THE BEAUTIFUL GAME.
          </p>

        </div>

      </section>

      <FutsalShowcase />
      <HowToBook />
      <Features />
     

      {/* FOOTER */}
      
        <footer className="simple-footer">

        <div className="footer-logo">
          <h2>Ritik</h2>
          <span>FUTSAL CLUB</span>
        </div>

        <div className="footer-copyright">
          © 2026 Ritik Futsal Club. All rights reserved.
        </div>

        <div className="footer-tagline">
          FIVE-A-SIDE / ALL HEART
        </div>

        </footer>


    </div>
  );
  
}

export default App;
