const express = require('express');

const router = express.Router();

const {
    createNotification,
    getUserNotifications,
    markNotificationAsRead,
    deleteNotification
} = require('../controllers/notificationController');

router.post('/', createNotification);

router.get('/:userId', getUserNotifications);

router.put('/:id/read', markNotificationAsRead);

router.delete('/:id', deleteNotification);

module.exports = router;