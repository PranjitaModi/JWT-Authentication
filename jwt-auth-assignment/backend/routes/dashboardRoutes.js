const express = require('express');
const router = express.Router();
const { userDashboard, managerDashboard, adminDashboard } = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/user', protect, userDashboard);
router.get('/manager', protect, authorize('manager', 'admin'), managerDashboard);
router.get('/admin', protect, authorize('admin'), adminDashboard);

module.exports = router;
