const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Creating user with hashing password
userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("All field must be filled");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

// Logging user with hashing password
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All field must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("email Not Exist");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};

const model = mongoose.model("user", userSchema);
module.exports = model;
