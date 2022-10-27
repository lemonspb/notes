import mongoose from "mongoose";

export default function runMongo(
  mongoUrl = "mongodb+srv://lemon1990:mishamisha123@cluster0.ojk4ewn.mongodb.net/?retryWrites=true&w=majority"
) {
  return mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
