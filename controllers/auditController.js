const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

// Create Audit
const createAudit = async (req, res) => {

    try {

        const {
            user_id,
            project_id,
            ground_status,
            progress_estimate,
            quality_assessment,
            safety_assessment,
            comments,
            gps_latitude,
            gps_longitude,
            is_gps_verified,
            gps_offset_meters,
            device_info,
            network_type
        } = req.body;

        const tracking_id =
            "MW-" + Date.now();

        const result = await pool.query(
            `
            INSERT INTO audits
            (
                id,
                tracking_id,
                user_id,
                project_id,
                ground_status,
                progress_estimate,
                quality_assessment,
                safety_assessment,
                comments,
                gps_latitude,
                gps_longitude,
                is_gps_verified,
                gps_offset_meters,
                verification_status,
                device_info,
                network_type
            )
            VALUES
            (
                $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,
                'Pending',
                $14,
                $15
            )
            RETURNING *;
            `,
            [
                uuidv4(),
                tracking_id,
                user_id,
                project_id,
                ground_status,
                progress_estimate,
                quality_assessment,
                safety_assessment,
                comments,
                gps_latitude,
                gps_longitude,
                is_gps_verified,
                gps_offset_meters,
                device_info,
                network_type
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

const getAudits = async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT *
            FROM audits
            ORDER BY created_at DESC;
        `);

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

const getAuditById = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `
            SELECT *
            FROM audits
            WHERE id = $1;
            `,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Audit not found."
            });
        }

        res.json({
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

const updateAudit = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            ground_status,
            progress_estimate,
            quality_assessment,
            safety_assessment,
            comments,
            gps_latitude,
            gps_longitude,
            is_gps_verified,
            gps_offset_meters,
            verification_status,
            device_info,
            network_type
        } = req.body;

        const result = await pool.query(
            `
            UPDATE audits
            SET
                ground_status = $1,
                progress_estimate = $2,
                quality_assessment = $3,
                safety_assessment = $4,
                comments = $5,
                gps_latitude = $6,
                gps_longitude = $7,
                is_gps_verified = $8,
                gps_offset_meters = $9,
                verification_status = $10,
                device_info = $11,
                network_type = $12,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $13
            RETURNING *;
            `,
            [
                ground_status,
                progress_estimate,
                quality_assessment,
                safety_assessment,
                comments,
                gps_latitude,
                gps_longitude,
                is_gps_verified,
                gps_offset_meters,
                verification_status,
                device_info,
                network_type,
                id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Audit not found."
            });
        }

        res.json({
            success: true,
            message: "Audit updated successfully.",
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

const deleteAudit = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `
            DELETE FROM audits
            WHERE id = $1
            RETURNING *;
            `,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Audit not found."
            });
        }

        res.json({
            success: true,
            message: "Audit deleted successfully."
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
    createAudit,
    getAudits,
    getAuditById,
    updateAudit,
    deleteAudit
};