const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const uploadEvidence = async (req, res) => {

    try {

        const {
            audit_id,
            capture_method
        } = req.body;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded."
            });
        }

        const result = await pool.query(
            `
            INSERT INTO evidence_files
            (
                id,
                audit_id,
                file_url,
                file_name,
                file_type,
                file_size,
                mime_type,
                capture_method
            )
            VALUES
            (
                $1,$2,$3,$4,$5,$6,$7,$8
            )
            RETURNING *;
            `,
            [
                uuidv4(),
                audit_id,
                req.file.path,
                req.file.originalname,
                req.file.mimetype.startsWith('image') ? 'image' :
                req.file.mimetype.startsWith('video') ? 'video' :
                'document',
                req.file.size,
                req.file.mimetype,
                capture_method
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

module.exports = {
    uploadEvidence
};