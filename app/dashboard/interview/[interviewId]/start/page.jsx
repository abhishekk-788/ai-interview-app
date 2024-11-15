"use client";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";

function StartInterview() {
  const searchParams = useSearchParams();
  const interviewData = searchParams.get("interviewData");

  const [activeQuestion, setActiveQuestion] = useState(0);

  let jsonMockResponse = null;
  let interviewQuestions = null;
  let interviewMockId = null;
  let interviewAnswers = null;
  try {
    if (interviewData) {
      const parsedData = JSON.parse(interviewData);
      interviewMockId = parsedData.mockId;
      console.log("interviewMockId", interviewMockId);
      jsonMockResponse = parsedData.jsonMockResp
        ? JSON.parse(parsedData.jsonMockResp)
        : null;
      interviewQuestions = jsonMockResponse.map((item) => item.question);
      interviewAnswers = jsonMockResponse.map((item) => item.answer);
    }
  } catch (error) {
    console.error("Error parsing interviewData:", error);
  }

  const handleQuestionClick = (index) => {
    setActiveQuestion(index);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {interviewQuestions ? (
          <QuestionSection
            interviewQuestions={interviewQuestions}
            activeQuestion={activeQuestion}
            onQuestionClick={handleQuestionClick} // Pass the click handler
          />
        ) : (
          <p>No interview data available.</p>
        )}
        {interviewQuestions && interviewMockId ? (
          <RecordAnswerSection
            interviewQuestions={interviewQuestions}
            interviewAnswers={interviewAnswers}
            activeQuestion={activeQuestion}
            interviewMockId={interviewMockId}
          />
        ) : (
          <p>Somthing went wrong</p>
        )}
      </div>
      <div className="flex justify-end items-end gap-6">
        {activeQuestion > 0 && (
          <Button onClick={() => setActiveQuestion(activeQuestion - 1)}>
            Previous Question
          </Button>
        )}
        {activeQuestion != interviewQuestions?.length - 1 && (
          <Button onClick={() => setActiveQuestion(activeQuestion + 1)}>
            Next Question
          </Button>
        )}
        {activeQuestion == interviewQuestions?.length - 1 && (
          <Button>End Interview</Button>
        )}
      </div>
    </div>
  );
}

export default StartInterview;
