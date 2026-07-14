const express = require('express');

const router = express.Router();

const {
    getLocationHierarchy
} = require('../controllers/locationController');

router.get('/hierarchy', getLocationHierarchy);

module.exports = router;