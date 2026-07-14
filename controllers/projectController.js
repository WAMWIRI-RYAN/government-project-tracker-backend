const { getDistance } = require('geolib');
const pool = require('../config/db');

// ==========================================
// GET ALL PROJECTS
// ==========================================
const getAllProjects = async (req, res) => {
    try {

        const result = await pool.query(`
            SELECT *
            FROM projects
            ORDER BY created_at DESC
        `);

        res.status(200).json({
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

// ==========================================
// GET PROJECT BY ID
// ==========================================
const getProjectById = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `SELECT * FROM projects WHERE id = $1`,
            [id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Project not found"
            });

        }

        res.status(200).json({
            success: true,
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

// ==========================================
// CREATE PROJECT
// ==========================================
const createProject = async (req, res) => {

    try {

        const {
            name,
            category,
            status,
            description,
            budget_allocated,
            county,
            constituency,
            ward,
            latitude,
            longitude
        } = req.body;

        const result = await pool.query(
            `
            INSERT INTO projects
            (
                name,
                category,
                status,
                description,
                budget_allocated,
                county,
                constituency,
                ward,
                latitude,
                longitude
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
            RETURNING *
            `,
            [
                name,
                category,
                status,
                description,
                budget_allocated,
                county,
                constituency,
                ward,
                latitude,
                longitude
            ]
        );

        res.status(201).json({
            success: true,
            message: "Project created successfully",
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

// ==========================================
// UPDATE PROJECT
// ==========================================
const updateProject = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            name,
            category,
            status,
            description,
            budget_allocated,
            county,
            constituency,
            ward,
            latitude,
            longitude
        } = req.body;

        const result = await pool.query(
            `
            UPDATE projects
            SET
                name = $1,
                category = $2,
                status = $3,
                description = $4,
                budget_allocated = $5,
                county = $6,
                constituency = $7,
                ward = $8,
                latitude = $9,
                longitude = $10,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $11
            RETURNING *;
            `,
            [
                name,
                category,
                status,
                description,
                budget_allocated,
                county,
                constituency,
                ward,
                latitude,
                longitude,
                id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Project updated successfully",
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

// ==========================================
// DELETE PROJECT
// ==========================================
const deleteProject = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `DELETE FROM projects
             WHERE id = $1
             RETURNING *`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Project deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// ==========================================
// GET NEARBY PROJECTS
// ==========================================
const getNearbyProjects = async (req, res) => {

    try {

        const { lat, lng, radius = 10 } = req.query;

        if (!lat || !lng) {
            return res.status(400).json({
                success: false,
                message: "Latitude and longitude are required."
            });
        }

        const result = await pool.query(`
            SELECT *
            FROM projects
            WHERE latitude IS NOT NULL
              AND longitude IS NOT NULL
        `);

        const nearbyProjects = result.rows.filter(project => {

            const distance = getDistance(
                {
                    latitude: Number(lat),
                    longitude: Number(lng)
                },
                {
                    latitude: Number(project.latitude),
                    longitude: Number(project.longitude)
                }
            );

            return distance <= Number(radius) * 1000;

        });

        res.status(200).json({
            success: true,
            count: nearbyProjects.length,
            data: nearbyProjects
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

    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    getNearbyProjects

};