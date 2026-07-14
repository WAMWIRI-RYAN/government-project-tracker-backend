const express = require('express');

const router = express.Router();

const authenticateFirebase = require('../middleware/authenticateFirebase');

const { syncUser } = require('../controllers/authController');

router.post('/sync', authenticateFirebase, syncUser);

module.exports = router;