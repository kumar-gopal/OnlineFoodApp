import express from 'express';
import { adminRoutes, vandorRoutes } from './routes';
import { dbconnect } from './config/dbconnection';

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/admins", adminRoutes);
app.use("/api/v1/vandors", vandorRoutes);

app.get("/home", (req, res) => {
    res.send("Working home route");
});

// Server and Database Initialization
const startServer = async () => {
    try {
        await dbconnect(); // Ensure database connection
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1); // Exit the app on failure
    }
};

startServer();
