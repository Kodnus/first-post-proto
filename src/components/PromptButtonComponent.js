import React, { useState } from "react";

function PromptButtonComponent({ buttonText, isActive, onClick }) {
  return (
    <div className="">
      <button
        onClick={onClick}
        className={`rounded-xl  h-10 w-[12rem] text-white font-semibold  ${
          isActive ? "bg-[#146a98]" : "bg-[#1d97d9]"
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default PromptButtonComponent;
