const express = require('express');
const router = express.Router();

const {
  createCertification,
  getCertifications,
  deleteCertification,
  updateCertification
} = require('../controllers/certificationController');

const { protect } = require('../middleware/authMiddleware');

// Public route
router.get('/', getCertifications);

// Admin routes
router.post('/', protect, createCertification);
router.put('/:id', protect, updateCertification);
router.delete('/:id', protect, deleteCertification);

module.exports = router;
