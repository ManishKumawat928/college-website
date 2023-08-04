const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Collaction
const collageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
});

collageSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log(`the current password is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    console.log(`the current password is ${this.password}`);
    this.confirmpassword = undefined;
  }
  next();
});
const Register = new mongoose.model("Register", collageSchema);
module.exports = Register;
