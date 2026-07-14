const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const syncUser = async (req, res) => {

    try {

        const firebaseUser = req.firebaseUser;

        const existingUser = await pool.query(
            'SELECT * FROM users WHERE firebase_uid = $1',
            [firebaseUser.uid]
        );

        if (existingUser.rows.length > 0) {

            return res.json({
                success: true,
                message: 'User already exists.',
                data: existingUser.rows[0]
            });

        }

        const newUser = await pool.query(
            `
            INSERT INTO users
            (
                id,
                firebase_uid,
                full_name,
                email,
                role
            )
            VALUES
            ($1,$2,$3,$4,$5)
            RETURNING *
            `,
            [
                uuidv4(),
                firebaseUser.uid,
                firebaseUser.name || '',
                firebaseUser.email,
                'citizen'
            ]
        );

        res.status(201).json({
            success: true,
            message: 'User created successfully.',
            data: newUser.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Server Error'
        });

    }

};

module.exports = {
    syncUser
};