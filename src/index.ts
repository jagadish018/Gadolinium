import "dotenv/config";
import { allRoutes } from "./routes/routes";
import { serve } from "@hono/node-server";

serve(allRoutes, (info) => {
  console.log(`Server running on ${info.port}`);
});
