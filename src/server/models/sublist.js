import mongoose from "mongoose";

const SublistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "title is required",
  },
  id: {
    type: Number,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const model = mongoose.model("Sublist", SublistSchema);
export default model;
