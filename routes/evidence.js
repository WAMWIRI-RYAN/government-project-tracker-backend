const express = require('express');

const router = express.Router();

const upload = require('../middleware/upload');

const {
    uploadEvidence
} = require('../controllers/evidenceController');
const authenticateFirebase = require('../middleware/authenticateFirebase');

router.post(
    '/',
    authenticateFirebase,
    upload.single('file'),
    uploadEvidence
);

module.exports = router;