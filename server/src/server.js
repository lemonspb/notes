import runApp from "./helpers/runApp.js";
import runMongo from "./helpers/mongo.js";

void (async () => {
  console.log("Starting mongo");
  await runMongo();
  console.log("Mongo connected");
  await runApp();
})();
