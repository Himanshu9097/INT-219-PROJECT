import app from "../Backend/src/app.js";
import { connectMongo } from "../Backend/src/lib/mongodb.js";

await connectMongo();

export default app;
