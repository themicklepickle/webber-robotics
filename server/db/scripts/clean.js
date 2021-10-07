import { connection } from "mongoose";
import connectDB from "../";

const clean = async () => {
  console.log("Cleaning database");

  await connectDB();
  await connection.dropDatabase();

  console.log("Database clean");
};

clean();
