const express = require('express');
const router = express.Router();

const {
  createProject,
  getProjects,
  deleteProject,
  updateProject
} = require('../controllers/projectController');

const { protect } = require('../middleware/authMiddleware');

// Public route
router.get('/', getProjects);

// Admin routes
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
