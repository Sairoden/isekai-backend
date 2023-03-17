const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minLength: 3, maxLength: 100 },
  lastName: { type: String, required: true, minLength: 3, maxLength: 100 },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 50,
  },
  password: { type: String, required: true, minLength: 6, maxLength: 1024 },
});

const User = mongoose.model("User", userSchema);

exports.User = User;
