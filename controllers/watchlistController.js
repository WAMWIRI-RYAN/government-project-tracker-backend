const pool = require('../config/db');

// Add project to watchlist
const addToWatchlist = async (req, res) => {

    try {

        const { user_id, project_id } = req.body;

        const result = await pool.query(
            `
            INSERT INTO watchlist
            (user_id, project_id)
            VALUES ($1,$2)
            RETURNING *;
            `,
            [user_id, project_id]
        );

        res.status(201).json({
            success: true,
            message: "Project added to watchlist.",
            data: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// Get watchlist
const getWatchlist = async (req, res) => {

    try {

        const { userId } = req.params;

        const result = await pool.query(
            `
            SELECT
                p.id AS project_id,
                p.name,
                p.status,
                p.county,
                p.constituency,
                p.ward
            FROM watchlist w
            JOIN projects p
            ON p.id = w.project_id
            WHERE w.user_id = $1;
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
            message: "Server Error"
        });

    }

};

// Remove
const removeFromWatchlist = async (req, res) => {

    try {

        const { userId, projectId } = req.params;

        await pool.query(
            `
            DELETE FROM watchlist
            WHERE user_id = $1
            AND project_id = $2
            `,
            [userId, projectId]
        );

        res.json({
            success: true,
            message: "Removed from watchlist."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

module.exports = {

    addToWatchlist,
    getWatchlist,
    removeFromWatchlist

};