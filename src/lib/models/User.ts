// lib/models/User.ts
import mongoose, { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = models.User || model('User', userSchema);

export default User;