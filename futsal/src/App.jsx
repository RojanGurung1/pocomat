import React from "react";
import "./App.css";
import FutsalShowcase from "./assets/component/FutsalShowcase";
import HowToBook from "./assets/component/HowToBook";
const features = [
  {
    number: "01",
    title: "THE GRASS GAME",
    label: "ARTIFICIAL GRASS",
    description:
      "That familiar underfoot feel. Soft artificial grass with rubber infill, made for confident touches and big plays.",
    image: "/images/turf.jpg",
  },
  {
    number: "02",
    title: "NIGHT GAMES",
    label: "PLAY ANYTIME",
    description:
      "Enjoy exciting football matches with bright floodlights and an energetic atmosphere, even after sunset.",
    image: "/images/night-game.jpg",
  },
  {
    number: "03",
    title: "GREAT FACILITIES",
    label: "PLAYER EXPERIENCE",
    description:
      "Enjoy a clean, organized and player-friendly environment with facilities that make every visit better.",
    image: "/images/facilities.jpg",
  },
];

function App() {
  return (
    <div className="website">

      {/* NAVIGATION */}
      <nav className="navbar">
        <div className="logo">
          <h1>Ritik</h1>
          <span>FUTSAL CLUB</span>
        </div>

        <div className="nav-links">
          <a href="#courts">Our courts</a>
          <a href="#experience">The experience</a>
          <a href="#booking">How to book</a>
        </div>

        <a href="#booking" className="book-btn">
          Book a court <span>↗</span>
        </a>
      </nav>


      {/* SECTION 01 - HERO */}
      <section className="hero" id="courts">

        <div className="hero-overlay"></div>

        <div className="hero-content">

          <p className="eyebrow">
            KATHMANDU SPIRIT. FIVE-A-SIDE SOUL.
          </p>

          <h2>
            YOUR SQUAD.
            <br />
            <span>YOUR GROUND.</span>
          </h2>

          <p className="description">
            Big energy. Better football. Get your team together
            <br className="desktop-break" />
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

          <div className="hero-info">
            <span className="lime-text">
              02 / COURT SURFACES
            </span>

            <span>
              5-A-SIDE / ALL HEART
            </span>
          </div>

        </div>

        <div className="hero-caption">
          BUILT FOR THE BEAUTIFUL GAME.
        </div>

      </section>


      {/* SECTION 02 - THREE FEATURES */}
      <section className="features-section" id="experience">

        <div className="features-header">

          <div>
            <p className="features-eyebrow">
              01 / WHY PLAY WITH US
            </p>

            <h2>
              MORE THAN JUST A GAME.
            </h2>
          </div>

          <p className="features-intro">
            Everything you need for a better
            futsal experience.
            <br />
            Bring your squad. Bring your game.
          </p>

        </div>

      </section>
      <section>
        <FutsalShowcase />
      </section>
      <section>
        <HowToBook />
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <h2>Ritik</h2>
        <p>FUTSAL CLUB · FIVE-A-SIDE / ALL HEART</p>
        <span>© 2026 Ritik Futsal Club. All rights reserved.</span>
      </footer>

    </div>
  );
  
}

export default App;
