import app from "./src/app.js";
import { config } from "./src/config/config.js";
import connectDB from "./src/config/db.js";

async function startServer() {
  //db connection
  await connectDB(config.dbUrl);

  const port = config.port;

  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
}
startServer();
