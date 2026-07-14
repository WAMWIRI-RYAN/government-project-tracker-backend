const express = require('express');

const router = express.Router();

const authenticateFirebase = require('../middleware/authenticateFirebase');
const requireRole = require('../middleware/requireRole');

const {

    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    getNearbyProjects

} = require('../controllers/projectController');

router.get('/', getAllProjects);

router.get('/nearby', getNearbyProjects);

router.get('/:id', getProjectById);

router.post(
    '/',
    authenticateFirebase,
    requireRole(['admin']),
    createProject
);

router.put(
    '/:id',
    authenticateFirebase,
    requireRole(['admin']),
    updateProject
);

router.delete(
    '/:id',
    authenticateFirebase,
    requireRole(['admin']),
    deleteProject
);

router.get('/nearby', getNearbyProjects);

module.exports = router;