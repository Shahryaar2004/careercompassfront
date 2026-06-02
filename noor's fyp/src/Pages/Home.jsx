import React from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      emoji: "🧠",
      title: "PERSONALITY",
      desc: "Uncover how you think and work best",
    },
    {
      emoji: "🔵",
      title: "18 QUESTIONS",
      desc: "Covering 6 key career dimensions",
    },
    {
      emoji: "✨",
      title: "ML MATCHED",
      desc: "Personalized field recommendations",
    },
  ];

  return (
    
    <div className="home-container">
      <div className="overlay"></div>

      <div className="content">
        <div className="icon-circle">🎯</div>

        <h1>
          Discover Your <br /> Career Path
        </h1>

        <p className="subtitle">
          A smart assessment that maps your personality, skills,
          <br /> and interests to the careers you'll actually love.
        </p>

        <div className="cards">
          {features.map((item, index) => (
            <div className="card" key={index}>
              <div className="emoji">{item.emoji}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <button
          className="start-btn"
          onClick={() => navigate("/instructions")}
        >
          Get Started →
        </button>
      </div>
    </div>
  );
};

export default Home;