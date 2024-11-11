import express from 'express';

// router imports
import bookReviewRouter from './router/bookReviewRouter.js'
import generalRouter from './router/generalRouter.js'

const app = express();
let server;

// middleware used on the server level and routing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/book-review', bookReviewRouter);
app.use('/', generalRouter)

function startServer(port) {
    return new Promise((resolve, reject) => {
        server = app.listen(port, () => {
            console.log(`Starting server.`);
            resolve();
        });
        server.on('error', reject);
    });
}

// Stop function
function stopServer() {
    return new Promise((resolve, reject) => {
        if (server) {
            server.close((error) => {
                if (error) return reject(error);
                console.log('Server stopped');
                resolve();
            });
        } else {
            resolve();
        }
    });
}

export { startServer, stopServer, app };
