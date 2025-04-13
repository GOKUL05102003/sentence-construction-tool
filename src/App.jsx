import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartScreen from "./components/StartScreen";
import QuestionScreen from "./components/QuestionScreen";
import FeedbackScreen from "./components/FeedbackScreen";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/start" element={<StartScreen />} />
        <Route path="/" element={<StartScreen />} />
        <Route path="/quiz" element={<QuestionScreen />} />
        <Route path="/feedback" element={<FeedbackScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
