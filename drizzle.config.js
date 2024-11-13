import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://neondb_owner:cWj0f4xPSpeX@ep-super-bar-a1kisbh7.ap-southeast-1.aws.neon.tech/AI%20Interview?sslmode=require",
  },
});
