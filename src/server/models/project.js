import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Title is required",
  },
  id: {
    type: Number,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  complated: {
    type: Boolean,
    default: false,
  },
  sublist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sublist",
    },
  ],
});

const model = mongoose.model("Project", ProjectSchema);
export default model;
