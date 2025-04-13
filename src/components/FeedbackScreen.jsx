import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import questionsData from "../data/questions.json";
import "./FeedbackScreen.css";

function FeedbackScreen() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { scoreData } = state || { scoreData: [] };
  const score = scoreData.filter((d) => d.isCorrect).length;
  const allQuestions = questionsData.data.questions;

  const getMessage = (score) => {
    if (score === 10) {
      return "Excellent! You’ve constructed all sentences perfectly. Keep up the great work!";
    } else if (score >= 8) {
      return "Great job! Most of your sentences were accurate. A little polishing will make them perfect.";
    } else if (score >= 5) {
      return "Good effort! You formed several correct sentences. Focus on clarity and word placement.";
    } else if (score >= 3) {
      return "You're getting there! Pay closer attention to sentence structure and grammar.";
    } else {
      return "Let’s try again! Practice makes perfect. Review the feedback and give it another shot!";
    }
  };

  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <h2>Quiz Feedback</h2>
        <button onClick={() => navigate("/start")} className="restart-btn">
          Restart Quiz
        </button>
      </div>

      <p className="score-text">
        Your Score: {score} / {scoreData.length}
      </p>
      <div className="dynamic-message">{getMessage(score)}</div>

      <div className="feedback-list">
        {scoreData.map((item, index) => {
          const originalQuestion = allQuestions.find(
            (q) => q.questionId === item.questionId
          );
          const userSentence = fillSentence(
            originalQuestion.question,
            item.selected
          );
          const correctSentence = fillSentence(
            originalQuestion.question,
            item.correct
          );

          return (
            <div
              key={index}
              className={`feedback-item ${
                item.isCorrect ? "correct" : "incorrect"
              }`}
            >
              <p className="prompt-label">
                Prompt ({index + 1}/{scoreData.length})
              </p>
              <p
                className="sentence"
                dangerouslySetInnerHTML={{ __html: userSentence }}
              />
              <p
                className={`response-status ${
                  item.isCorrect ? "correct-text" : "incorrect-text"
                }`}
              >
                {item.isCorrect ? "Correct" : "Incorrect"}
              </p>
              {!item.isCorrect && (
                <>
                  <p className="correct-label">Correct Answer:</p>
                  <p
                    className="sentence"
                    dangerouslySetInnerHTML={{ __html: correctSentence }}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function fillSentence(sentence, words) {
  const parts = sentence.split("_____________");
  let filled = "";

  parts.forEach((part, index) => {
    filled += part;
    if (index < parts.length - 1) {
      if (words[index]) {
        filled += `<strong>${words[index]}</strong>`;
      } else {
        filled += "_____________";
      }
    }
  });

  return filled;
}

export default FeedbackScreen;
