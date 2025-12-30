const express = require('express');
const router = express.Router();
const { getBuses } = require('../controllers/busController');
const { protectDriver } = require('../middleware/driverAuthMiddleware');

router.route('/').get(protectDriver, getBuses);

module.exports = router;
