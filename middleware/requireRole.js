const pool = require('../config/db');

const requireRole = (allowedRoles) => {

    return async (req, res, next) => {

        try {

            const firebaseUid = req.user.uid;

            const result = await pool.query(
                `
                SELECT role
                FROM users
                WHERE firebase_uid = $1;
                `,
                [firebaseUid]
            );

            if (result.rows.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "User not found."
                });

            }

            const userRole = result.rows[0].role;

            if (!allowedRoles.includes(userRole)) {

                return res.status(403).json({
                    success: false,
                    message: "Access denied."
                });

            }

            req.user.role = userRole;

            next();

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };

};

module.exports = requireRole;