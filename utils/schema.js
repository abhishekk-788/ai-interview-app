import { pgTable, serial, varchar, text } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDesc: varchar("jobDesc").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt"),
  mockId: varchar("mockId").notNull(),
});

export const UserAnswer = pgTable("userAnswer", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockId").notNull(),
  userEmail: varchar("userEmail").notNull(),
  question: varchar("questionId").notNull(),
  correctAns: text("correctAns").notNull(),
  userAnswer: text("userAnswer").notNull(),
  feedback: text("feedback"),
  rating: text("rating"),
  createdAt: varchar("createdAt").notNull(),
});
