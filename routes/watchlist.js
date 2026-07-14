const express = require('express');

const router = express.Router();

const {

    addToWatchlist,
    getWatchlist,
    removeFromWatchlist

} = require('../controllers/watchlistController');
const authenticateFirebase = require('../middleware/authenticateFirebase');

router.post(
    '/',
    authenticateFirebase,
    addToWatchlist
);

router.get(
    '/:userId',
    authenticateFirebase,
    getWatchlist
);

router.delete(
    '/:id',
    authenticateFirebase,
    removeFromWatchlist
);

module.exports = router;