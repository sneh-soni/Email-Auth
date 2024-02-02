import mongoose from "mongoose";

export default async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!); // ! neccessary
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB Connected Successfully");
    });

    connection.on("error", (err) => {
      console.log("MongoDB Connection Error: " + err);
      process.exit();
    });
  } catch (error) {
    console.log("Something Went Wrong with DB: ", error);
  }
}
