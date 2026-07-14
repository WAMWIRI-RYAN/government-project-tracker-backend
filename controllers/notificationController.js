const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const createNotification = async (req, res) => {

    try {

        const {
            user_id,
            project_id,
            category,
            priority,
            title,
            description,
            is_gov_response,
            action_url
        } = req.body;

        const result = await pool.query(
            `
            INSERT INTO notifications
            (
                id,
                user_id,
                project_id,
                category,
                priority,
                title,
                description,
                is_gov_response,
                action_url
            )
            VALUES
            (
                $1,$2,$3,$4,$5,$6,$7,$8,$9
            )
            RETURNING *;
            `,
            [
                uuidv4(),
                user_id,
                project_id,
                category,
                priority,
                title,
                description,
                is_gov_response,
                action_url
            ]
        );

        res.status(201).json({
            success: true,
            data: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getUserNotifications = async (req, res) => {

    try {

        const { userId } = req.params;

        const result = await pool.query(
            `
            SELECT *
            FROM notifications
            WHERE user_id = $1
            ORDER BY created_at DESC;
            `,
            [userId]
        );

        res.json({
            success: true,
            count: result.rows.length,
            data: result.rows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const markNotificationAsRead = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `
            UPDATE notifications
            SET is_read = TRUE
            WHERE id = $1
            RETURNING *;
            `,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Notification not found."
            });
        }

        res.json({
            success: true,
            message: "Notification marked as read.",
            data: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const deleteNotification = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `
            DELETE FROM notifications
            WHERE id = $1
            RETURNING *;
            `,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Notification not found."
            });
        }

        res.json({
            success: true,
            message: "Notification deleted successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createNotification,
    getUserNotifications,
    markNotificationAsRead,
    deleteNotification
};