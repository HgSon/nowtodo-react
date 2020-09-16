import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  userName: String,
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "userName" });
const model = mongoose.model("User", UserSchema);
export default model;
