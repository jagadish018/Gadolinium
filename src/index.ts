
import "dotenv/config";
import { hono } from "./routes";
import { serve } from "@hono/node-server";

serve(hono, (info) => {
  console.log(`Server running on ${info.port}`);
})