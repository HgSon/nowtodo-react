import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "name" });
const model = mongoose.model("User", UserSchema);
export default model;
