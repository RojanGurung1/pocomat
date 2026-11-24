
import React from "react";
import "./HowToBook.css";

const steps = [
  {
    number: "01",
    title: "CHOOSE YOUR COURT",
    description: "Pick your favourite surface. Grass turf or rubber, the choice is yours.",
  },
  {
    number: "02",
    title: "BOOK YOUR TIME",
    description: "Select a convenient date and time that works for your squad.",
  },
  {
    number: "03",
    title: "LET'S PLAY",
    description: "Confirm your booking, bring your teammates and enjoy the game.",
  },
];

function HowToBook() {
  return (
    <section className="booking-process" id="how-to-book">
      <div className="booking-card-line"></div>
      <div className="booking-top">
        <span>03 / HOW TO PLAY</span>
        <span>RITIK FUTSAL CLUB</span>
      </div>

      <div className="booking-heading">
        <div>
          <h2>YOUR GAME.</h2>
          <h2 className="lime-text">YOUR RULES.</h2>
        </div>

        <p>
          Three steps. One pitch.
          <br />
          Endless memories.
        </p>
      </div>

      <div className="booking-cards">

        {steps.map((step, index) => (
          <div
            className={`booking-card ${index === 2 ? "highlight-card" : ""}`}
            key={step.number}
          >
            <div className="booking-card-top">
              <span className="booking-number">
                {step.number}
              </span>

              <span className="booking-arrow">↗</span>
            </div>

            <div className="booking-card-line"></div>

            <h3>{step.title}</h3>

            <p>{step.description}</p>
          </div>
        ))}

      </div>

      <div className="booking-bottom">
        <span>LESS PLANNING. MORE PLAYING.</span>
        <span>FIVE-A-SIDE / ALL HEART</span>
      </div>

    </section>
  );
}

export default HowToBook;
