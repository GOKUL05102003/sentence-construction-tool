import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import questionsData from "../data/questions.json";
import "./QuestionScreen.css";
import { motion, AnimatePresence } from "framer-motion";

const QuestionScreen = () => {
  const navigate = useNavigate();
  const allQuestions = questionsData.data.questions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState(Array(4).fill(""));
  const [timer, setTimer] = useState(30);
  const [scoreData, setScoreData] = useState([]);
  const soundPlayedRef = useRef(false);
  const audioRef = useRef(null);

  const currentQuestion = allQuestions[currentIndex];

  const handleSelect = (word) => {
    const index = selectedWords.findIndex((w) => w === "");
    if (index !== -1) {
      const newWords = [...selectedWords];
      newWords[index] = word;
      setSelectedWords(newWords);
    }
  };

  const handleUnselect = (index) => {
    const newWords = [...selectedWords];
    newWords[index] = "";
    setSelectedWords(newWords);
  };

  const handleNext = () => {
    const isCorrect =
      JSON.stringify(selectedWords) ===
      JSON.stringify(currentQuestion.correctAnswer);
    const newScoreData = [
      ...scoreData,
      {
        questionId: currentQuestion.questionId,
        selected: selectedWords,
        correct: currentQuestion.correctAnswer,
        isCorrect,
      },
    ];
    setScoreData(newScoreData);

    if (currentIndex < allQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedWords(Array(4).fill(""));
      setTimer(30);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      soundPlayedRef.current = false;
    } else {
      navigate("/feedback", { state: { scoreData: newScoreData } });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 11 && !soundPlayedRef.current) {
          audioRef.current = new Audio("/alarm.mp3");
          audioRef.current.loop = true;
          audioRef.current
            .play()
            .catch((err) => console.warn("Autoplay issue:", err));
          soundPlayedRef.current = true;
        }

        if (prev <= 1) {
          clearInterval(interval);
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
          handleNext();
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="question-container">
      <div className="question-header">
        <div className="timer">{timer}s</div>
        <div className="question-number">
          Question {currentIndex + 1} / {allQuestions.length}
        </div>
      </div>

      <div className="progress-bar-container">
        {allQuestions.map((_, i) => (
          <div
            key={i}
            className={`progress-step ${i <= currentIndex ? "active" : ""}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.4 }}
        >
          <div className="prompt">
            Select the missing words in the correct order
          </div>

          <p className="sentence">
            {currentQuestion.question.split("_____________").map((part, i) => (
              <span key={i}>
                {part}
                {i < 4 && (
                  <span className="blank-box" onClick={() => handleUnselect(i)}>
                    {selectedWords[i] ? (
                      <span className="selected-word">{selectedWords[i]}</span>
                    ) : (
                      "_____________"
                    )}
                  </span>
                )}
              </span>
            ))}
          </p>

          <div className="options-grid">
            {currentQuestion.options.map((word, index) => (
              <button
                key={index}
                className="option-button"
                onClick={() => handleSelect(word)}
                disabled={selectedWords.includes(word)}
              >
                {word}
              </button>
            ))}
          </div>

          <button
            className="next-button"
            onClick={handleNext}
            disabled={selectedWords.includes("")}
          >
            {currentIndex < allQuestions.length - 1 ? "Next" : "Submit"}
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuestionScreen;
