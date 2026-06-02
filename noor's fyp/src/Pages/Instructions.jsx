import React, { useState } from "react";
import "../styles/Instructions.css";
import { useNavigate } from "react-router-dom";

const Instructions = () => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="instructions-wrapper">
      <div className="instructions-card">
         <div className="top-badges">
          <span className="badge red">INSTRUCTIONS</span>
          <span className="badge dark">~8 MINUTES</span>
        </div>

        <h1>Before you begin</h1>

        <hr />

        <div className="steps">

          <div className="step">
            <div className="circle">01</div>
            <p>
              <strong>Answer honestly.</strong> There are no right or wrong
              answers. Choose what feels most true to you, not what you think
              sounds best.
            </p>
          </div>

          <div className="step">
            <div className="circle">02</div>
            <p>
              <strong>Go with your gut.</strong> Don't overthink each question.
              Your first instinct is usually the most accurate reflection of your
              preferences.
            </p>
          </div>

          <div className="step">
            <div className="circle">03</div>
            <p>
              <strong>18 questions across 6 categories:</strong> Interests, Work
              Style, Skills, Values, Environment, and Future Goals.
            </p>
          </div>

          <div className="step">
            <div className="circle">04</div>
            <p>
              <strong>You'll receive a career profile</strong> with top field
              matches and explanation based on your answers.
            </p>
          </div>

        </div>
        <div className="agree">
          <input
            type="checkbox"
            onChange={(e) => setChecked(e.target.checked)}
          />
          <label>I understand this assessment is for guidance purposes and I agree to answer honestly to receive the most accurate career recommendations.</label>
        </div>

        <button
          disabled={!checked}
          onClick={() => navigate("/assessment")}
        >
          Start Assessment →
        </button>

      </div>
    </div>
  );
};

export default Instructions;