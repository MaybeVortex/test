const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const todoRoutes = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Connect to MongoDB & start server
async function startServer() {
    let mongoUri = process.env.MONGO_URI;

    try {
        // Try connecting to the configured MongoDB
        await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 3000 });
        console.log('✅ Connected to MongoDB');
    } catch (err) {
        console.log('⚠️  Local MongoDB not available. Starting in-memory MongoDB...');
        const { MongoMemoryServer } = require('mongodb-memory-server');
        const mongod = await MongoMemoryServer.create();
        mongoUri = mongod.getUri();
        await mongoose.connect(mongoUri);
        console.log('✅ Connected to in-memory MongoDB');
        console.log('   Note: Data will be lost when the server stops.');
        console.log('   Install MongoDB locally for persistent storage.');
    }

    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}

startServer();
