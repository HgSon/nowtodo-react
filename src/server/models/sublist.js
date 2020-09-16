import mongoose from "mongoose";

const SublistSchema = new mongoose.Schema({
  content: {
    type: String,
    required: "contents is required",
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const model = mongoose.model("Sublist", SublistSchema);
export default model;
