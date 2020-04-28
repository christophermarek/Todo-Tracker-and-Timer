
const express = require('express');
const router = express.Router();
const localAuthRoutes = require('./localAuth');
const apiRoutes = require('./api');

router.use('/auth', localAuthRoutes);
router.use('/api', apiRoutes);
// fallback 404
router.use('/api', (req, res) => res.status(404).json('No route for this path'));

module.exports = router;