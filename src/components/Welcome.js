import React from "react";

export default function Welcome(props) {
  return (
    <div className="welcome-wrapper">
      <div className="title">Quizzical</div>
      <div className="description">
        My first React Project
        <span aria-label="smiling" role="img">
          😁
        </span>
      </div>
      <span
        className="start-button"
        onClick={() => {
          props.setShowQuiz(true);
        }}
      >
        Start quiz
      </span>
    </div>
  );
}
