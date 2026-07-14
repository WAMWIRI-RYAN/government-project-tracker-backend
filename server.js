console.log("Starting server...");
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const pool = require('./config/db');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');
const auditRoutes = require('./routes/audits');
const notificationRoutes = require('./routes/notifications');
const locationRoutes = require('./routes/locations');
const watchlistRoutes = require('./routes/watchlist');
const evidenceRoutes = require('./routes/evidence');
const commentRoutes = require('./routes/comments');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/audits', auditRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/evidence', evidenceRoutes);
app.use('/api/comments', commentRoutes);



app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Maendeleo Watch Backend API is running!'
    });
});
console.log("About to start listening...");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});app.use