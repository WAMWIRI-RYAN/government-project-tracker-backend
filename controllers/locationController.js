const pool = require('../config/db');

// ==========================================
// GET LOCATION HIERARCHY
// ==========================================
const getLocationHierarchy = async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT *
            FROM locations
            ORDER BY level, name
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

module.exports = {
    getLocationHierarchy
};