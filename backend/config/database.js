const mongoose = require('mongoose');

const connectDatabase = () => {
    const MONGO_URI = process.env.MONGO_URI;
    console.log("Connecting to MongoDB at:", MONGO_URI);

    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(con => {
        console.log(`✅ MongoDB connected to host: ${con.connection.host}`);
    })
    .catch(err => {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1);
    });
};

module.exports = connectDatabase;
