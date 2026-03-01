const express = require('express');
const router = express.Router();


const {
  createContact,
  getContacts,
  deleteContact,
  markAsRead
} = require('../controllers/contactController');

const { protect } = require('../middleware/authMiddleware');

// Public route
const { validateContact, checkValidation } = require('../validators/contactValidator');

router.post('/', validateContact, checkValidation, createContact);


// Admin routes
router.get('/', protect, getContacts);
router.delete('/:id', protect, deleteContact);
router.patch('/:id/read', protect, markAsRead)

module.exports = router;
