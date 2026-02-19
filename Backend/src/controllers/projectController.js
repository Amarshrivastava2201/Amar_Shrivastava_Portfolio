const Project = require('../models/Project');
const asyncHandler = require('../utils/asyncHandler');


// Create new project
const createProject = asyncHandler(async (req, res) => {
  const { title, description, techStack, liveUrl, githubUrl, image, featured } = req.body;

  const project = await Project.create({
    title,
    description,
    techStack,
    liveUrl,
    githubUrl,
    image,
    featured
  });

  res.status(201).json(project);
});


// Get all projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
};

// Delete project
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.deleteOne();

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete project' });
  }
};

// Update project
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    Object.assign(project, req.body);

    const updatedProject = await project.save();

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update project' });
  }
};

module.exports = {
  createProject,
  getProjects,
  deleteProject,
  updateProject
};
