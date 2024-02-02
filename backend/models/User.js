const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  socials: Object,
  profile_picture: String,
  bio: { type: String, default: "" },
  dateOfBirth: { type: Date, required: true },
  registeredAt: { type: Date, default: new Date() },
  roles: Array,
});

module.exports = mongoose.model("User", UserSchema);
