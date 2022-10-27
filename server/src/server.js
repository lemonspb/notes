// const express = require("express");
// const { MongoClient, ServerApiVersion } = require("mongodb");
// const mongoose = require("mongoose");
// const Note = require("./models/Notes");
// const Lila = require("./models/Lila");

// const app = express();
// const port = 3001;
// const uri =
//   "mongodb+srv://lemon1990:mishamisha123@cluster0.ojk4ewn.mongodb.net/?retryWrites=true&w=majority";

// app.use(express.json());
// async function start() {
//   try {
//     await mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverApi: ServerApiVersion.v1,
//     });
//     app.listen(port, () => {
//       console.log(`dffdsf app listening on   port ${port}`);
//     });
//   } catch (e) {
//     console.log("Server Error", e.message);
//     process.exit(1);
//   }
// }

// start();

// app.post("/lila", async (req, res) => {
//   const notes = new Lila({
//     age: 28,
//     cat: "Malasha",
//     misha: "cool",
//     weight: 44,
//   });
//   await notes.save();
//   res.status(201).json({ notes });
// });

// app.patch("/lilaUpdate", async (req, res) => {
//   const _id = "635050377acce55716f54b2d";

//   const age = 29;
//   const newLila = await Lila.findOneAndUpdate(_id, { age: age });
//   res.status(201).json({ newLila });
// });

// app.get("/lilaget/:id", async (req, res) => {
//   const { id } = req.params;
//   const lila = await Lila.findById(id);
//   return res.status(200).json(lila);
// });

// app.delete("/delete", async (req, res) => {
//    await Lila.deleteOne(id);
//   return res.status(200);
// });

import runApp from "./helpers/runApp.js";
import runMongo from "./helpers/mongo.js";

void (async () => {
  console.log("Starting mongo");
  await runMongo();
  console.log("Mongo connected");
  await runApp();
})();
