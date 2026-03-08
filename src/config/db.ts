import mongoose from "mongoose";

async function connectDB(dbUrl: string) {
  try {
    mongoose.connection.on("error", (error) => {
      console.log("Database connection error!", error);
    });
    mongoose.connection.on("disconnected", () => {
      console.log("Database disconnected.");
    });
    await mongoose.connect(dbUrl);
    console.log("Database connected Successfully!");
  } catch (error) {
    console.log("Failed to connect Database!", error);
    process.exit(1);
  }
}

export default connectDB;
