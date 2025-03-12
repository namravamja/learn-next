import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Please enter username"],
    unique: true,
  },
  email: {
    type: String,
    require: [true, "Please enter email"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Please enter password"],
  },
  isVerified: {
    type: Boolean,
    default: fasle,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("User", userSchema);

export default User;
