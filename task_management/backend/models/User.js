const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Modern + safe way: async hook without calling next()
userSchema.pre('save', async function () {
  // 'this' is the document being saved
  if (!this.isModified('password')) {
    return; // no need to do anything
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // No next() — Mongoose waits for promise to resolve
  } catch (err) {
    // If error → throw it → save() will reject
    throw err;
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);