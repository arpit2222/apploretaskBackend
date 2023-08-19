const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bio: String,
  profile_image: String,
  pen_name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['writer', 'admin'],
    default: 'writer',
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
},

{ timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
