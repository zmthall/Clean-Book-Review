// /index.js (or /app.js)
import { startServer, stopServer } from './framework/server.js';

const PORT = process.env.PORT || 3000;

// Start the server
startServer(PORT)
    .then(() => {
        console.log(`Server is up and running on port ${PORT}`);
    })
    .catch((error) => {
        console.error('Failed to start the server:', error);
        process.exit(1);
    });

// Optionally, listen for termination signals to stop the server gracefully
process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing server...');
    await stopServer();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('SIGINT signal received: closing server...');
    await stopServer();
    process.exit(0);
});