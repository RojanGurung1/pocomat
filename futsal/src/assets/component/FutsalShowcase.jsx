import "./FutsalShowcase.css";

const futsalFeatures = [
  {
    id: 1,
    title: "THE GRASS GAME",
    image: "/ball.jpg",
    description:
      "Experience the perfect football atmosphere on quality artificial grass. Enjoy smooth movement, better ball control and comfortable gameplay. Bring your squad and enjoy every moment on the pitch.",
  },

  {
    id: 2,
    title: "NIGHT GAMES",
    image: "/pitch.jpg",
    description:
      "The excitement doesn't stop when the sun goes down. Play your favourite game under bright floodlights and enjoy an energetic atmosphere with your friends and teammates.",
  },

  {
    id: 3,
    title: "GREAT FACILITIES",
    image: "/ground.jpeg",
    description:
      "Enjoy a clean, organized and player-friendly futsal environment. Our goal is to make every visit comfortable, enjoyable and memorable for players and teams.",
  },
];

function FutsalShowcase() {
  return (
    <section className="futsal-showcase" id="experience">

      {/* SECTION HEADING */}
      <div className="showcase-heading">
        <p>01 / THE RITIK EXPERIENCE</p>

        <h2>BUILT FOR THE LOVE OF THE GAME.</h2>
      </div>

      {/* FEATURE CARDS */}
      <div className="showcase-grid">

        {futsalFeatures.map((feature) => (
          <article className="showcase-card" key={feature.id}>

            <div className="showcase-image">
              <img
                src={feature.image}
                alt={feature.title}
              />
            </div>

            <h3>{feature.title}</h3>

            <p className="showcase-description">
              {feature.description}
            </p>

          </article>
        ))}

      </div>
     
     
    </section>
  );
}

export default FutsalShowcase;
