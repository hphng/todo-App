const express = require('express')
const router = express.Router()
const userRoute = require('./user.routes')
const taskRoute = require('./task.routes');

router.use('/users', userRoute);
router.use('/tasks', taskRoute);

module.exports = router;