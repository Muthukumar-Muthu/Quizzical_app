import React from "react";
import "./styles.css";
import Welcome from "./components/Welcome";
import QuizPage from "./components/QuizPage";

export default function App() {
  const [showQuiz, setShowQuiz] = React.useState(false);
  return (
    <div className="wrapper">
      {showQuiz ? <QuizPage /> : <Welcome setShowQuiz={setShowQuiz} />}
    </div>
  );
}
