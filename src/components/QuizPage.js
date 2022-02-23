import React from "react";
import Question from "./Question";
import he from "he";
import Preloader from "./Preloader";
export default function QuizPage(props) {
  const [quizArray, setQuizArray] = React.useState([]);
  const [showResult, setShowResult] = React.useState(false);
  const [playAgain, setPlayAgain] = React.useState(false);
  const [highScore, setHighScore] = React.useState(
    () => JSON.parse(localStorage.getItem("high-score")) || 0
  );
  const [error, setError] = React.useState("");
  let globalMark = 0;
  React.useEffect(() => {
    function addResult(objectArray) {
      let i = 0;
      const result = objectArray.map((object) => ({
        ...object,
        question: he.decode(object.question),
        options: shuffleArray([
          object.correct_answer,
          ...object.incorrect_answers
        ]),
        result: false,
        selected: "",
        id: i++
      }));
      return result;
    }
    const fetchData = async () => {
      setQuizArray([]);
      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=10&category=24&difficulty=easy"
        );
        if (response.ok) {
          const json = await response.json();
          setQuizArray(addResult(json.results));
        } else throw new Error("can't fetch quizzes");
      } catch (e) {
        setError("can't fetch quizzes");
        console.log(e);
      }
      setShowResult(false);
    };
    fetchData();
    if (highScore < globalMark) {
      setHighScore(globalMark);
      localStorage.setItem("high-score", JSON.stringify(globalMark));
    }
  }, [playAgain]);

  function clickHandler(e, id) {
    const selectedValue = e.target.innerText;
    !showResult &&
      setQuizArray((previousState) => {
        return previousState.map((object) => {
          return object.id === id
            ? {
                ...object,
                selected: selectedValue
              }
            : object;
        });
      });
  }

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  const quizzes = quizArray.map((quiz) => (
    <Question
      key={quiz.id}
      clickHandler={clickHandler}
      question={quiz.question}
      quizId={quiz.id}
      selected={quiz.selected}
      correctAnswer={quiz.correct_answer}
      showResult={showResult}
      options={quiz.options}
    />
  ));

  function check() {
    setQuizArray((previousState) => {
      return previousState.map((object) => {
        return {
          ...object,
          result:
            object.selected != null
              ? object.correct_answer.toLowerCase() ===
                object.selected.toLowerCase()
              : false
        };
      });
    });
    setShowResult(true);
  }
  function calculateMarks() {
    let marks = 0;
    quizArray.forEach((object) => {
      object.result && marks++;
    });
    globalMark = marks;
    return marks;
  }
  return (
    <div className="quiz-page">
      {quizArray.length ? (
        <>
          <div>{quizzes}</div>
          {showResult ? (
            <>
              <div className="result">
                <span className="score">
                  {`You scored ${calculateMarks()} / ${
                    quizArray.length
                  } correct answers`}
                </span>
                <span
                  className="play-again-button"
                  onClick={() => {
                    setPlayAgain((p) => !p);
                  }}
                >
                  Play again
                </span>
              </div>
              <span className="high-score">
                {`Previous High-Score : ${highScore}`}
              </span>
            </>
          ) : (
            <span className="check-button" onClick={check}>
              Check answers
            </span>
          )}
        </>
      ) : (
        <>{error ? error : <Preloader />}</>
      )}
    </div>
  );
}
