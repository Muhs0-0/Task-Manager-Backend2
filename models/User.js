import mongoose from "mongoose";
import Task from "./tasks.js"
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String, // ✅ store a single string (not an array)
    required: true,
    unique: true, // optional, but good to prevent duplicate emails
  },
  Password: {
    type: String, // ✅ just a string
    required: true,
  },
});

// ✅ Middleware to delete tasks when a user is deleted
UserSchema.pre("findOneAndDelete", async function (next) {
  const user = await this.model.findOne(this.getQuery());
  if (user) {
    await Task.deleteMany({ userId: user._id });
  }
  next();
});


export default mongoose.model("User", UserSchema);



