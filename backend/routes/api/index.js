const express = require('express');
const router = express.Router();
const usersRoutes = require('./users');
const todosRoutes = require('./todos');
const categoryRoutes = require('./category');

router.use('/users', usersRoutes);
router.use('/todos', todosRoutes);
router.use('/category', categoryRoutes);

module.exports = router;