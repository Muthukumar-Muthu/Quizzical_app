import React from "react";

export default function Question(props) {
  let i = 0;

  function determineClassName(option) {
    return `option 
    ${
      props.showResult
        ? correctOrWrongAnswer(option)
        : props.selected.toLowerCase() === option.toLowerCase()
        ? "selected"
        : ""
    }`;
  }
  function correctOrWrongAnswer(option) {
    if (props.correctAnswer.toLowerCase() === option.toLowerCase()) {
      return "correct";
    } else if (option.toLowerCase() === (props.selected ?? "").toLowerCase()) {
      return "wrong";
    } else return "unselected";
  }

  const shuffledArray = props.options;
  const options = shuffledArray.map((option) => (
    <span
      className={determineClassName(option)}
      key={i++}
      onClick={(e) => props.clickHandler(e, props.quizId)}
    >
      {option}
    </span>
  ));
  return (
    <div className="question-wrapper">
      <div className="question">
        {props.question}
        {props.showResult ? (
          !props.selected ? (
            <span className="unanswered">{` --> Unanswered`}</span>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
      <div className="options">{options}</div>
    </div>
  );
}
