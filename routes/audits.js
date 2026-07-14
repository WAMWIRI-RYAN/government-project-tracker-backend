const express = require('express');

const router = express.Router();

const authenticateFirebase = require('../middleware/authenticateFirebase');
const requireRole = require('../middleware/requireRole');

const {
    createAudit,
    getAudits,
    getAuditById,
    updateAudit,
    deleteAudit
} = require('../controllers/auditController');

router.post(
    '/',
    authenticateFirebase,
    requireRole(['citizen', 'officer', 'admin']),
    createAudit
);

router.get('/', getAudits);

router.get('/:id', getAuditById);

router.put('/:id', updateAudit);

router.delete('/:id', deleteAudit);

module.exports = router;