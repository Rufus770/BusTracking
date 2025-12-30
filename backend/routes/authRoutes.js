const express = require('express');
const router = express.Router();
const { registerStudent, loginStudent, loginDriver } = require('../controllers/authController');

router.post('/student/register', registerStudent);
router.post('/student/login', loginStudent);
router.post('/driver/login', loginDriver);

module.exports = router;
