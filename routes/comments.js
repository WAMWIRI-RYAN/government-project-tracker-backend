const express = require('express');

const router = express.Router();

const {
    createComment,
    getProjectComments,
    updateComment,
    deleteComment
} = require('../controllers/commentController');

const authenticateFirebase = require('../middleware/authenticateFirebase');
const requireRole = require('../middleware/requireRole');

// Create comment
router.post(
    '/',
    authenticateFirebase,
    requireRole(['citizen', 'officer', 'admin']),
    createComment
);

// Get comments for a project
router.get('/project/:projectId', getProjectComments);

// Update comment
router.put('/:id', updateComment);

// Delete comment
router.delete('/:id', deleteComment);

module.exports = router;