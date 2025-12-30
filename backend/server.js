const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const busRoutes = require('./routes/busRoutes');

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "*", // In production, restrict this to your frontend's URL
        methods: ["GET", "POST"]
    }
});

app.use('/api/auth', authRoutes);
app.use('/api/buses', busRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    // Listen for location updates from a driver
    socket.on('locationUpdate', (data) => {
        // Broadcast the location to the specific bus's room
        io.to(data.busId).emit('location', { lat: data.lat, lng: data.lng });
    });

    // Allow a client to join a room for a specific bus
    socket.on('joinBusRoom', (busId) => {
        socket.join(busId);
        console.log(`Client joined room for bus ${busId}`);
    });

    socket.on('disconnect', () => {
        console.log('WebSocket disconnected');
    });
});

const PORT = 5005; // Using a hardcoded port to avoid conflicts

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
