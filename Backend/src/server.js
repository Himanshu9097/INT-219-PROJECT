import app from "./app.js";
import { logger } from "./lib/logger.js";
import { connectMongo } from "./lib/mongodb.js";

const port = process.env.PORT || 5001;

connectMongo()
  .then(() => {
    app.listen(port, (err) => {
      if (err) {
        logger.error({ err }, "Error listening on port");
        process.exit(1);
      }
      logger.info({ port }, "Server listening");
    });
  })
  .catch((err) => {
    logger.error({ err }, "Failed to connect to MongoDB");
    process.exit(1);
  });
