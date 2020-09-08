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
  },
  sublist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sublist",
    },
  ],
});

const model = mongoose.model("project", ProjectSchema);
export default model;
