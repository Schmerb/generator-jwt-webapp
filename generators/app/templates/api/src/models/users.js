import bcrypt from "bcryptjs";
import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  phoneNumber: { type: String, default: "" }
});

UserSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    email: this.email || "",
    username: this.username || "",
    firstName: this.firstName || "",
    lastName: this.lastName || "",
    phoneNumber: this.phoneNumber || ""
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

export const User = mongoose.model("User", UserSchema);

export default User;
