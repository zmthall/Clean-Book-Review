import { ControllerError } from "../../utility/error.js";
import 'dotenv/config';

export function authenticate(req, next) {
    const { api_key } = req.headers;
    if(api_key && api_key === process.env.API_KEY) {
        return next();
    } else {
        throw new ControllerError({ message: 'Access denied. Authorization restricted; missing API Key.' });
    }
}
