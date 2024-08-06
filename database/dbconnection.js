import mongoose from "mongoose";

export const dbconnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "todolist" })
    .then(() => {
      console.log("Successfully Connected to Database");
    })
    .catch((error) => {
      console.log(`Some error occured ${error}`);
    });
};
