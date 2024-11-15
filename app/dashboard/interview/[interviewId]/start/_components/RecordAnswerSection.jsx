import Webcam from "react-webcam";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "../../../../../../utils/geminiAIModel";
import { db } from "../../../../../../utils/db";
import { UserAnswer } from "../../../../../../utils/schema";
import moment from "moment";
import { useUser } from "@clerk/nextjs";

function RecordAnswerSection({
  interviewQuestions,
  interviewAnswers,
  activeQuestion,
  interviewMockId,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    // Update userAnswer whenever results change
    if (results && results.length > 0) {
      const newTranscript = results
        .map((result) => result?.transcript)
        .join(" ");
      setUserAnswer(newTranscript);
    }
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      console.log("User Answer:", userAnswer);
      updateUserAnswer();
    }
  }, [userAnswer]);

  const startStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
      setUserAnswer("");
      setLoading(false);
    } else {
      startSpeechToText();
    }
  };

  const updateUserAnswer = async () => {
    setLoading(true);
    const feedbackPrompt =
      "Question: " +
      interviewQuestions[activeQuestion] +
      "\n" +
      "UserAnswer: " +
      userAnswer +
      "\n\n" +
      "Depends on question and user answer for give interview question," +
      "please give us rating out of 5 and feedback as area of improvement if any in just 3-5 lines in JSON format with rating field and feedback field";

    const result = await chatSession.sendMessage(feedbackPrompt);

    const feedbackResponse = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    const jsonFeedbackResponse = JSON.parse(feedbackResponse);
    console.log("jsonFeedbackResponse", jsonFeedbackResponse);

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewMockId,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      question: interviewQuestions[activeQuestion],
      correctAns: interviewAnswers[activeQuestion],
      userAnswer: userAnswer,
      feedback: jsonFeedbackResponse?.feedback,
      rating: jsonFeedbackResponse?.rating,
      createdAt: moment().format("DD-MM-YYYY"),
    });

    if (resp) {
      toast.success("User answer recorded successfully");
      setResults([]);
    } else {
      toast.error("Error while saving user answer");
    }
    
    setResults([]);
    setUserAnswer("");
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col mt-10 justify-center items-center bg-gray-800 rounded-lg p-5">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 400,
            width: 600,
            zIndex: 10,
          }}
        />
      </div>

      <Button
        disabled={loading}
        className="my-5"
        variant={isRecording ? "destructive" : "outline"}
        onClick={startStopRecording}
      >
        {isRecording ? (
          <h2 className="text-white flex gap-2 items-center">
            <StopCircle /> Stop Recording
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
