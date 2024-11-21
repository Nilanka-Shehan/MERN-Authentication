const mongooose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongooose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your name is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // Skip if the password field hasn't been modified
  }

  if (!this.password) {
    console.error("Password is undefined!");
    throw new Error("Password must be provided before saving");
  }

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    console.error("Error hashing password:", err);
    next(err);
  }
});

module.exports = mongooose.model("User", userSchema);
