const express = require("express");
const app = express();
const cors = require("cors");

// Import your database configuration and route files
const dbConfig = require('./db');
const roomsRoute = require('./routes/roomsRoute');
const usersRoute = require('./routes/usersRoute');
const bookingRoute = require('./routes/bookingsRoute');

// Middleware to parse JSON request bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// Define your API routes
app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);
app.use('/api/bookings', bookingRoute)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Node erver running on port (Node Server Started`));
