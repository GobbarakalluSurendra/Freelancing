import Project from '../models/Project.js';

// @desc    Fetch all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
export const createProject = async (req, res, next) => {
  try {
    const { title, description, techStack, liveLink, githubLink } = req.body;
    
    let imageUrl = '';
    if (req.file) {
      imageUrl = req.file.path; // Cloudinary URL
    } else {
      res.status(400);
      throw new Error('Image is required');
    }

    const project = new Project({
      title,
      description,
      imageUrl,
      techStack: techStack ? JSON.parse(techStack) : [], // Expecting a JSON string for array
      liveLink,
      githubLink,
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
export const updateProject = async (req, res, next) => {
  try {
    const { title, description, techStack, liveLink, githubLink } = req.body;

    const project = await Project.findById(req.params.id);

    if (project) {
      project.title = title || project.title;
      project.description = description || project.description;
      project.liveLink = liveLink || project.liveLink;
      project.githubLink = githubLink || project.githubLink;
      
      if (techStack) {
         project.techStack = JSON.parse(techStack);
      }

      if (req.file) {
        project.imageUrl = req.file.path;
      }

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404);
      throw new Error('Project not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      await project.deleteOne();
      res.json({ message: 'Project removed' });
    } else {
      res.status(404);
      throw new Error('Project not found');
    }
  } catch (error) {
    next(error);
  }
};
