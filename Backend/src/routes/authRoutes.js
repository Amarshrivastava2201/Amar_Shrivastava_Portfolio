const express = require('express');
const router = express.Router();
const { loginAdmin } = require('../controllers/authController');

router.post('/login', loginAdmin);

const { protect } = require('../middleware/authMiddleware');

router.get('/profile', protect, (req, res) => {
  res.json(req.user);
});


module.exports = router;
