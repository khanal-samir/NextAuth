import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI!); // always will be string guarantee
    const connection = mongoose.connection; // to see error after connection
    connection.on("connected", () => {
      console.log("MongoDB connected!!");
    });
    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error, please make sure db is up and running" + err,
        process.exit(),
      );
    });
  } catch (error) {
    console.error("Something went wrong connecting to DB");
    console.log(error);
  }
}
