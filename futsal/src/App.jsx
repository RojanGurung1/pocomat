import React from "react";
import "./App.css";
import FutsalShowcase from "./assets/component/FutsalShowcase";
import HowToBook from "./assets/component/HowToBook";
import Features from "./assets/component/features";

const features = [
  {
    number: "01",
    title: "THE GRASS GAME",
    label: "ARTIFICIAL GRASS",
    description:
      "That familiar underfoot feel. Soft artificial grass with rubber infill, made for confident touches and big plays.",
    image: "/bash.jpg",
  },
  {
    number: "02",
    title: "NIGHT GAMES",
    label: "PLAY ANYTIME",
    description:
      "Enjoy exciting football matches with bright floodlights and an energetic atmosphere, even after sunset.",
    image: "/bleh.jpg",
  },
  {
    number: "03",
    title: "GREAT FACILITIES",
    label: "PLAYER EXPERIENCE",
    description:
      "Enjoy a clean, organized and player-friendly environment with facilities that make every visit better.",
    image: "/beh.jpg",
  },
];

function App() {
  return (
      <div className="website">

      {/* NAVBAR */}
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

          <div className="hero-info">
            <span>03 / COURT SURFACES</span>
            <span>5-A-SIDE / ALL HEART</span>
          </div>

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
      <section>
        <FutsalShowcase />
      </section>
      <section>
        <HowToBook />
      </section>
      <section>
        <Features />
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
