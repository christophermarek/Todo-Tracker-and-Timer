const express = require('express');
const router = express.Router();
const usersRoutes = require('./users');
const todosRoutes = require('./todos');

router.use('/users', usersRoutes);
router.use('/todos', todosRoutes);

module.exports = router;