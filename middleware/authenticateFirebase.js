const admin = require('../firebase/firebaseAdmin');

const authenticateFirebase = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'No authentication token provided.'
            });
        }

        const token = authHeader.split('Bearer ')[1];

        const decodedToken = await admin.auth().verifyIdToken(token);

        req.firebaseUser = decodedToken;

        next();

    } catch (error) {

        console.error(error);

        return res.status(401).json({
            success: false,
            message: 'Invalid Firebase token.'
        });

    }

};

module.exports = authenticateFirebase;