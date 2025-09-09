const app = require('./app');
const connectDatabase = require('./config/database');  // looks inside backend/config/db.js
const dotenv = require('dotenv');
const path = require('path');

// Load env variables
dotenv.config({ path: path.join(__dirname, 'config/config.env') });

// Connect Database
connectDatabase();

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode`);
});
