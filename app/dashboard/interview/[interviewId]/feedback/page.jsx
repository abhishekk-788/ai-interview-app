"use client";
import { UserAnswer } from "../../../../../utils/schema";
import { db } from "../../../../../utils/db";
import React, { useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function FeedBack({ params }) {
  const [feedbackList, setFeebackList] = useState([]);
  const router = useRouter();
  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = async () => {
    console.log("params", params);
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    console.log(result);
    setFeebackList(result);
  };
  return (
    <div className="p-10">
      {feedbackList?.length == 0 ? (
        <h2 className="font-bold text-xl text-gray-500">
          No Interview Feedback Record Found
        </h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">
            Congratulations!
          </h2>
          <h2 className="font-bold text-2xl">
            {" "}
            Here is your interview feedback{" "}
          </h2>
          <h2 className="text-primary text-lg my-3">
            {" "}
            Your overall interview rating: <strong> 7/10 </strong>
          </h2>
          <h2>
            Find your interview question with correct answer, Your answer and
            feedback for improvement
          </h2>
          {feedbackList.length > 0 &&
            feedbackList.map((item, index) => (
              <Collapsible key={index} className="mt-5">
                <CollapsibleTrigger
                  className="p-2 flex justify-between 
                bg-secondary rounded-lg my-2 text-left gap-7 w-full"
                >
                  {item.question}{" "}
                  <ChevronsUpDown className="h-5 w-5"></ChevronsUpDown>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-red-500 p-2 border rounded-lg">
                      <strong>Rating:</strong>
                      {item.rating}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                      <strong>Your Answer: </strong>
                      {item.userAnswer}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                      <strong>Correct Answer: </strong>
                      {item.correctAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary">
                      <strong>Feedback: </strong>
                      {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}
      <Button className="my-5" onClick={() => router.replace("/dashboard")}>
        Go Home
      </Button>
    </div>
  );
}

export default FeedBack;