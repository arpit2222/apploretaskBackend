const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sections: [
    {
      subtitle: String,
      data: String,
      image: String,
    },
  ],
  comments: [
    {
      id: mongoose.Schema.Types.ObjectId,
      comment: String,
      is_active: {
        type: Boolean,
        default: true,
      },
    },
  ],
  status: {
    type: Boolean,
    default: true,
  },
},
{ timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
