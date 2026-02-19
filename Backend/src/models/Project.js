const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    techStack: [
      {
        type: String
      }
    ],
    liveUrl: {
      type: String
    },
    githubUrl: {
      type: String
    },
    image: {
      type: String
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
