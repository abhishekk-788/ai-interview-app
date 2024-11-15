"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../utils/db";
import { MockInterview } from "../../../../utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      setInterviewData(result[0]);
      console.log("interviewData: ", result[0]);
    } catch (error) {
      console.error("Error fetching interview data:", error);
    }
  };

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            {interviewData ? (
              <>
                <h2 className="text-lg">
                  <strong>Job Role/Job Position:</strong>{" "}
                  {interviewData.jobPosition}
                </h2>
                <h2 className="text-lg">
                  <strong>Job Description:</strong> {interviewData.jobDesc}
                </h2>
                <h2 className="text-lg">
                  <strong>Years of Experience:</strong>{" "}
                  {interviewData.jobExperience}
                </h2>
              </>
            ) : (
              <p>Loading interview details...</p>
            )}
          </div>
          <div className="p-5 rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-500">
              {process.env.NEXT_PUBLIC_INFORMATION}
            </h2>
          </div>
        </div>
        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full rounded-lg my-5 p-20 bg-secondary" />
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setWebCamEnabled(true)}
              >
                Enable Web cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="mt-5 flex justify-end items-end">
        {interviewData && (
          <div className="mt-5 flex justify-end items-end">
            <Link
              href={{
                pathname: `/dashboard/interview/${params.interviewId}/start`,
                query: {
                  interviewId: params.interviewId,
                  webCamEnabled: webCamEnabled,
                  interviewData: JSON.stringify(interviewData), // Stringify to pass as query
                },
              }}
            >
              <Button>Start Interview</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Interview;
