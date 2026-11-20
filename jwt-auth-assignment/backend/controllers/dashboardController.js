// GET /api/dashboard/user  — any logged-in user
const userDashboard = (req, res) => {
  res.json({
    message: 'User dashboard',
    user: req.user,
  });
};

// GET /api/dashboard/manager  — manager and admin only
const managerDashboard = (req, res) => {
  res.json({
    message: 'Manager dashboard',
    user: req.user,
  });
};

// GET /api/dashboard/admin  — admin only
const adminDashboard = (req, res) => {
  res.json({
    message: 'Admin dashboard',
    user: req.user,
  });
};

module.exports = { userDashboard, managerDashboard, adminDashboard };
