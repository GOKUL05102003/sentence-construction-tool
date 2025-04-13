import React from "react";
import { useNavigate } from "react-router-dom";
import { PencilLine } from "lucide-react";
import "./StartScreen.css";

function StartScreen() {
  const navigate = useNavigate();

  return (
    <div className="start-screen">
      <div className="start-box fade-in">
        <PencilLine className="start-icon" size={42} />
        <h1 className="title">Sentence Construction</h1>
        <p className="description">
          Select the correct words to complete the sentence by arranging the
          provided options in the right order.
        </p>

        <div className="info-box">
          <div className="info-item">
            <p className="label">Time Per Question</p>
            <p className="value">30 sec</p>
          </div>
          <div className="info-item">
            <p className="label">Total Questions</p>
            <p className="value">10</p>
          </div>
          <div className="info-item">
            <p className="label">Coins</p>
            <p className="value">🟡 0</p>
          </div>
        </div>

        <div className="btn-group">
          <button className="back-btn" onClick={() => navigate(-1)}>
            Back
          </button>
          <button className="start-btn" onClick={() => navigate("/quiz")}>
            Start
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartScreen;
