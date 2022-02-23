import React from "react";

export default function Preloader() {
  return (
    <div className="pre-loader">
      <div className="shape">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
      <div className="shadow">
        <div className="shape-shadow"></div>
        <div className="shape-shadow"></div>
        <div className="shape-shadow"></div>
      </div>
    </div>
  );
}
