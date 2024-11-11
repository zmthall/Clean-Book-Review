import { ControllerError } from "../../utility/error.js";

export function errorHandler(err, req, res, next) {
    console.error(err.message); // Log the error for debugging
    
    if (err instanceof ControllerError) {
        // Respond with the error status and message if it's a ControllerError
        res.status(err.status || 500).json({ success: false, status: err.status || 500, error: err.message });
    } else {
        // For other errors, respond with a generic message
        res.status(500).json({ success: false, status: 500, error: 'Internal Server Error' });
    }
}