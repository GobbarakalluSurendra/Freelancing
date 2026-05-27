import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true, // Cloudinary URL
    },
    techStack: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: String,
      enum: ['Full Stack', 'Frontend', 'Backend', 'Design', 'Other'],
      default: 'Full Stack',
    },
    liveLink: {
      type: String,
      required: false,
    },
    githubLink: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
