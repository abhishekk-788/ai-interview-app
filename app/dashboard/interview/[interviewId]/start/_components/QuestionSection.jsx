import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

function QuestionSection({
  interviewQuestions,
  activeQuestion,
  onQuestionClick,
}) {
  console.log("interviewQuestions:", interviewQuestions, activeQuestion);

  const textToSpeech = (text) => {
    if ("SpeechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Your browser do not support text to speech.");
    }
  };
  return (
    <div className="p-5 my-10 border rounded-lg">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {interviewQuestions.map((question, index) => (
          <>
            <h2
              className={`p-2 rounded-full text-xs md:text-sm 
            text-center cursor-pointer ${
              activeQuestion === index
                ? "bg-primary text-white"
                : "bg-secondary"
            }`}
              key={index}
              onClick={() => onQuestionClick(index)}
            >
              Question #{index + 1}
            </h2>
          </>
        ))}
      </div>
      <h2 className="mt-10 mb-5 text-md md:text-lg">
        {interviewQuestions[activeQuestion]}
      </h2>
      <Volume2
        className="cursor-pointer"
        onClick={() => textToSpeech(interviewQuestions[activeQuestion])}
      />
      <div className="border rounded-lg p-5 mt-10 bg-blue-100">
        <h2 className="flex gap-2 items-center text-primary">
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className="text-sm text-primary my-2">
          {" "}
          {process.env.NEXT_PUBLIC_QUESTION_NOTE}
        </h2>
      </div>
    </div>
  );
}

export default QuestionSection;
