// import mongoose from "mongoose";

// mongoose.connect("mongodb://localhost:27017/nowTodo", {
//   useNewUrlParser: true,
//   useFindAndModify: false,
// });

// const db = mongoose.connection;
// const handleOpen = () => console.log("👌Connected to DB");
// const handleError = (error) => console.log(`⛔${error}`);
// db.once("open", handleOpen);
// db.on("error", handleError);

export const testDB = {
  id: 123123,
  todo: { list: 1, list2: 2 },
};

export const test = {
  id: 2323123,
  todo: { list: 1, list2: 2 },
};
